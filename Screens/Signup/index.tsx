import { useState, type FunctionComponent } from "react"
import { View } from "react-native"
import { Text, Button, Input } from "native-base"
import { useForm, Controller } from "react-hook-form"
import { auth } from "../../firebase"
import { User } from "firebase/auth"
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
	const [authErrorMessage, setAuthErrorMessage] = useState<string>("")

	const onSubmit = (data: SignupInputs) => {
		auth
			.signInWithEmailAndPassword(data.email, data.password)
			.then((userCredential) => {
				console.log("user signed in : ", userCredential)
				dispatch(authenticate({ user: userCredential.user as User }))
			})
			.catch((e) => setAuthErrorMessage(e.message as string))
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: 20,
				backgroundColor: "#ffffff",
			}}
		>
			<View style={{ width: "90%", marginBottom: 10 }}>
				<Text style={{ fontSize: 15, textAlign: "center" }}>Email address</Text>
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
							keyboardType="email-address"
							style={{
								backgroundColor: "#ffffff",
								borderRadius: 5,
								paddingHorizontal: 10,
								paddingVertical: 8,
								fontSize: 16,
								borderWidth: 1,
								borderColor: "#cccccc",
								width: "100%",
							}}
						/>
					)}
					name="email"
					defaultValue=""
				/>
				{errors.email && (
					<Text style={{ color: "red", marginTop: 5 }}>
						{errors.email.message}
					</Text>
				)}
			</View>
			<View style={{ width: "90%", marginBottom: 10 }}>
				<Text style={{ fontSize: 15, textAlign: "center" }}>Password</Text>
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
							secureTextEntry={true}
							style={{
								backgroundColor: "#ffffff",
								borderRadius: 5,
								paddingHorizontal: 10,
								paddingVertical: 8,
								fontSize: 16,
								borderWidth: 1,
								borderColor: "#cccccc",
								width: "100%",
							}}
						/>
					)}
					name="password"
					defaultValue=""
				/>
				{errors.password && (
					<Text style={{ color: "red", marginTop: 5 }}>
						{errors.password.message}
					</Text>
				)}
			</View>
			{authErrorMessage && (
				<Text style={{ color: "red" }} mb="3">
					{authErrorMessage}
				</Text>
			)}
			<Button
				onPress={handleSubmit(onSubmit)}
				style={{
					backgroundColor: "#2196F3",
					paddingVertical: 12,
					borderRadius: 25,
					width: "90%",
				}}
			>
				<Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
					Se connecter à l'application
				</Text>
			</Button>
		</View>
	)
}

export { FormLogin }
