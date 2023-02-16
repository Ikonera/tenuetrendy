import { type FunctionComponent } from "react"
import { View } from "react-native"
import { Text, Button, Input } from "native-base"
import { useForm, Controller } from "react-hook-form"
import { fireDB, auth } from "../../firebase"
import { getAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

const FormLogin: FunctionComponent = () => {
	type SignupInputs = {
		email: string
		password: string
	}

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupInputs>({ mode: "onChange" })

	const onSubmit = (data: SignupInputs) => {
		auth
			.signInWithEmailAndPassword(data.email, data.password)
			.then(async (userCredential) => {
				console.log("User signed in!")
				console.log(userCredential)
				await AsyncStorage.setItem(
					"@TenueTrendy:userUid",
					userCredential.user?.uid as string
				)
				console.log("stock id")
			})
			.catch((error) => {
				console.log("Error", error.message)
			})
	}

	return (
		<View>
			<Text>Please enter your email:</Text>
			<Controller
				control={control}
				rules={{
					required: "Email is required",
					pattern: {
						value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
						message: "Please enter a valid email address",
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						placeholder="Email"
						keyboardType="email-address"
					/>
				)}
				name="email"
				defaultValue=""
			/>
			{errors.email && (
				<Text style={{ color: "red" }}>{errors.email.message}</Text>
			)}

			<Text>Please enter your password:</Text>
			<Controller
				control={control}
				rules={{
					required: "Password is required",
					minLength: {
						value: 8,
						message: "Password length must be higher or equal to 8 caracters",
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						placeholder="Password"
						secureTextEntry={true}
					/>
				)}
				name="password"
				defaultValue=""
			/>
			{errors.password && (
				<Text style={{ color: "red" }}>{errors.password.message}</Text>
			)}

			<Button onPress={handleSubmit(onSubmit)}>Submit</Button>
		</View>
	)
}

export { FormLogin }
