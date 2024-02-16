import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthNumber from '../screens/AuthNumber';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthVerifyCode from '../screens/AuthVerifyCode';
import CompleteProfile from '../screens/CompleteProfile';
import auth from '@react-native-firebase/auth';
import GreenHouse from '../screens/GreenHouse';
import theme from '../resources/theme-schema.json';
import {IconContext, Plant, ShoppingCart, User} from 'phosphor-react-native';
import {StyleSheet, Text} from 'react-native';
import Store from '../screens/Store';
import Profile from '../screens/Profile';
import OwnedPlantDetails from '../screens/OwnedPlantDetails';
import MilestoneDetail from '../screens/MilestoneDetail';
import PlantDetail from '../screens/PlantDetail';
import Checkout from '../screens/Checkout';
import {useSelector} from 'react-redux';
import {selectSigned} from '../store/features/authSlice';
import AddMilestone from '../screens/AddMilestone';
import AssignedPlants from '../screens/AssignedPlants';
import PlantAssignedDetail from '../screens/PlantAssignedDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          headerShown: false,
          tabBarIcon: ({focused, size}) => {
            let icon;
            if (route.name === 'GreenHouse') {
              icon = <Plant />;
            }
            if (route.name === 'Store') {
              icon = <ShoppingCart />;
            }
            if (route.name === 'Profile') {
              icon = <User />;
            }
            return (
              <IconContext.Provider
                value={{
                  color: focused
                    ? theme.colors.primary
                    : theme.colors['text-primary'],
                  size: size,
                }}>
                {icon}
              </IconContext.Provider>
            );
          },
          tabBarLabel: ({focused, children}) => {
            return (
              <Text
                style={{
                  fontFamily: 'Jakarta-Regular',
                  color: focused
                    ? theme.colors.primary
                    : theme.colors['text-primary'],
                }}>
                {children}
              </Text>
            );
          },
        };
      }}>
      {/*<Tab.Screen name="GreenHouse" component={GreenHouse} />*/}
      <Tab.Screen name="GreenHouse" component={AddMilestone} />
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.background,
  },
};

export default function Navigation() {
  const signed = useSelector(selectSigned);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        {!signed ? (
          <Stack.Group>
            <Stack.Screen name="AuthNumber" component={AuthNumber} />
            <Stack.Screen name="AuthVerifyCode" component={AuthVerifyCode} />
          </Stack.Group>
        ) : (
          //<Stack.Screen name="CompleteProfile" component={CompleteProfile} />
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen
              name="OwnedPlantDetails"
              component={OwnedPlantDetails}
              options={{
                headerShown: true,
                headerTitle: 'Detalles de tu planta',
              }}
            />
            <Stack.Screen
              name="MilestoneDetail"
              component={MilestoneDetail}
              options={{headerShown: true, headerTitle: 'Detalles del Hito'}}
            />
            <Stack.Screen
              name="PlantDetail"
              component={PlantDetail}
              options={{headerShown: true, headerTitle: 'Tienda - Detalles'}}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{headerShown: true, headerTitle: 'Finalizar Compra'}}
            />
            <Stack.Screen
              name="PlantAssignedDetail"
              component={PlantAssignedDetail}
              options={{headerShown: true, headerTitle: 'Detalles de Planta'}}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
