import React from "react"
import { View, Text, TextInput, Button } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { fireDB, auth } from "./firebase"

const FormLogin = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
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
			<Controller
				control={control}
				rules={{
					required: "Email is required",
					pattern: {
						value: /^\S+@\S+$/i,
						message: "Please enter a valid email address",
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
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
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
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

			<Button title="Submit" onPress={handleSubmit(onSubmit)} />
		</View>
	)
}

export default FormLogin
