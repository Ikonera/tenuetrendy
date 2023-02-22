import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { type FunctionComponent } from "react"
import Fa5 from "react-native-vector-icons/FontAwesome5"
import Ant from "react-native-vector-icons/AntDesign"
import { HomeScreen, FavScreen } from "../../../Screens"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CartScreen } from "../../../Screens/CartScreen"

const Tabs = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeFavorites: FunctionComponent = () => {
	return (
		<Tabs.Navigator
			initialRouteName="Home"
			backBehavior="history"
			screenOptions={navigatorProps}
		>
			<Tabs.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ size, color }) => (
						<Fa5 name="home" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="Favorites"
				component={FavScreen}
				options={{
					title: "Favorites",
					headerShown: false,
					tabBarIcon: ({ size, color }) => (
						<Ant name="heart" color={color} size={size} />
					),
				}}
			/>
		</Tabs.Navigator>
	)
}

const AppStack: FunctionComponent = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={HomeFavorites}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Cart" component={CartScreen} />
		</Stack.Navigator>
	)
}

const navigatorProps = {
	tabBarActiveBackgroundColor: "#FFF", // #55DAC4
	tabBarActiveTintColor: "#55DAC4",
	tabBarInactiveTintColor: "#C2C2C2",
	tabBarInactiveBackgroundColor: "#FFF",
	tabBarHideOnKeyboard: true,
}

export { AppStack }
