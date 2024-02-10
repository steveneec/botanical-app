import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AuthNumber from "../screens/AuthNumber";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthVerifyCode from "../screens/AuthVerifyCode";
import CompleteProfile from "../screens/CompleteProfile";
import auth from "@react-native-firebase/auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!auth().currentUser ? (
          <Stack.Group>
            <Stack.Screen name="AuthNumber" component={AuthNumber} />
            <Stack.Screen name="AuthVerifyCode" component={AuthVerifyCode} />
          </Stack.Group>
        ) : (
          <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
