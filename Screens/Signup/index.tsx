import { type FunctionComponent } from "react"
import { View } from "react-native"
import { Text, Button, Input } from "native-base"
import { useForm, SubmitHandler } from "react-hook-form"
import { fireDB, auth } from "../../firebase"

const FormLogin: FunctionComponent = () => {
	type SignupInputs = {
		email: string
		password: string
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupInputs>({ mode: "onChange" })

	const onSubmit: SubmitHandler<SignupInputs> = (data: SignupInputs) => {
		auth
			.signInWithEmailAndPassword(data.email, data.password)
			.then((userCredential) => {
				console.log("User signed in!")
				console.log(userCredential)
			})
			.catch((error) => {
				console.log("Error", error.message)
			})
	}

	return (
		<View>
			<Text>Please enter your email:</Text>
			<Input
				{...register("email", {
					required: {
						value: true,
						message: "Email is required",
					},
					pattern: {
						value: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/,
						message: "Please enter a valid email address",
					},
				})}
			/>
			{errors.email && (
				<Text style={{ color: "red" }}>{errors.email.message}</Text>
			)}
			<Text>Please enter your password:</Text>
			<Input
				{...register("password", {
					required: {
						value: true,
						message: "Password is required",
					},
					minLength: {
						value: 8,
						message: "Your password must be longer thant 8 caracters",
					},
				})}
			/>
			{errors.password && (
				<Text style={{ color: "red" }}>{errors.password.message}</Text>
			)}
			<Button onPress={handleSubmit(onSubmit)}>Submit</Button>
		</View>
	)
}

export { FormLogin }
