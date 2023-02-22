import { type FunctionComponent } from "react"
import { View } from "react-native"
import { Text, Button, Input } from "native-base"
import { useForm, Controller } from "react-hook-form"
import { fireDB, auth } from "../../firebase"
import { getAuth, User } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAppDispatch } from "../../Store/Store"
import { authenticate } from "../../Store/reducers/auth"

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
	const dispatch = useAppDispatch()

	const onSubmit = (data: SignupInputs) => {
		auth
			.signInWithEmailAndPassword(data.email, data.password)
			.then((userCredential) => {
				console.log("user signed in : ", userCredential)
				dispatch(authenticate({ user: userCredential.user as User }))
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
