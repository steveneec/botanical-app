import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthNumber from '../screens/AuthNumber';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthVerifyCode from '../screens/AuthVerifyCode';
import CompleteProfile from '../screens/CompleteProfile';
import GreenHouse from '../screens/GreenHouse';
import theme from '../resources/theme-schema.json';
import {IconContext, Plant, ShoppingCart, User} from 'phosphor-react-native';
import {Text} from 'react-native';
import Store from '../screens/Store';
import Profile from '../screens/Profile';
import OwnedPlantDetails from '../screens/OwnedPlantDetails';
import PlantDetail from '../screens/PlantDetail';
import Checkout from '../screens/Checkout';
import {useSelector} from 'react-redux';
import {selectSigned, selectUser} from '../store/features/authSlice';
import AddMilestone from '../screens/AddMilestone';
import AssignedPlants from '../screens/AssignedPlants';
import CategoryStore from '../screens/CategoryStore';
import Success from '../screens/Sucess';
import Bills from '../screens/Bills';
import {usuarioType} from '../types';
import Recommendation from '../screens/Recommendation';
import RecommendationResult from '../screens/RecommendationResult';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const user: usuarioType = useSelector(selectUser);
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          headerShown: false,
          tabBarIcon: ({focused, size}) => {
            let icon;
            if (route.name === 'GreenHouse') icon = <Plant />;
            if (route.name === 'Store') icon = <ShoppingCart />;
            if (route.name === 'Profile') icon = <User />;
            if (route.name === 'AssignedPlants') icon = <Plant />;

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
            let label = '';
            if (route.name === 'Store') label = 'Tienda';
            if (route.name === 'Profile') label = 'Perfil';
            if (route.name === 'GreenHouse') label = 'Invernadero';
            if (route.name === 'AssignedPlants') label = 'Mis plantas';

            return (
              <Text
                style={{
                  fontFamily: 'Jakarta-Regular',
                  color: focused
                    ? theme.colors.primary
                    : theme.colors['text-primary'],
                }}>
                {label}
              </Text>
            );
          },
        };
      }}>
      {user && user.rol === 'manager' ? (
        <>
          <Tab.Screen name="AssignedPlants" component={AssignedPlants} />
          <Tab.Screen name="Profile" component={Profile} />
        </>
      ) : (
        <>
          <Tab.Screen name="GreenHouse" component={GreenHouse} />
          <Tab.Screen name="Store" component={Store} />
          <Tab.Screen name="Profile" component={Profile} />
        </>
      )}
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
  const user = useSelector(selectUser);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        {!signed ? (
          <Stack.Group>
            <Stack.Screen name="AuthNumber" component={AuthNumber} />
            <Stack.Screen name="AuthVerifyCode" component={AuthVerifyCode} />
          </Stack.Group>
        ) : user ? (
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
              name="CategoryStore"
              component={CategoryStore}
              options={{headerShown: true, headerTitle: 'Tienda - Categoría'}}
            />
            <Stack.Screen
              name="Success"
              component={Success}
              options={{headerShown: true, headerTitle: ''}}
            />
            <Stack.Screen
              name="Bills"
              component={Bills}
              options={{headerShown: true, headerTitle: 'Historial de compras'}}
            />
            <Stack.Screen
              name="AddMilestone"
              component={AddMilestone}
              options={{headerShown: true, headerTitle: 'Agregar Hito'}}
            />
            <Stack.Screen name="Recommendation" component={Recommendation} />
            <Stack.Screen
              name="RecommendationResult"
              component={RecommendationResult}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Register" component={CompleteProfile} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
