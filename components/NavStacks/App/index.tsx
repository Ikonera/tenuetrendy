import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { type FunctionComponent } from "react"
import Fa5 from "react-native-vector-icons/FontAwesome5"
import Ant from "react-native-vector-icons/AntDesign"
import { HomeScreen, FavScreen, FormLogin } from "../../../Screens"

const Tabs = createBottomTabNavigator()

const AppStack: FunctionComponent = () => {
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

const navigatorProps = {
	tabBarActiveBackgroundColor: "#FFF", // #55DAC4
	tabBarActiveTintColor: "#55DAC4",
	tabBarInactiveTintColor: "#C2C2C2",
	tabBarInactiveBackgroundColor: "#FFF",
	tabBarHideOnKeyboard: true,
}

export { AppStack }
