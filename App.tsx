import React from "react"
import { Provider } from "react-redux"
import { GlobalStore } from "./Store"
import { NativeBaseProvider } from "native-base"
import { RouterOutlet } from "./components/RouterOutlet"

function App(): JSX.Element {
	return (
		<Provider store={GlobalStore}>
			<NativeBaseProvider>
				<RouterOutlet />
			</NativeBaseProvider>
		</Provider>
	)
}

export default App