import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectToken,
  selectUser,
  setRNUser,
  setSigned,
  setToken,
  setUser,
} from '../store/features/authSlice';
import {
  CaretRight,
  ClockCounterClockwise,
  GitBranch,
  IconContext,
  SignOut,
  Star,
} from 'phosphor-react-native';
import {usuarioType} from '../types';
import theme from '../resources/theme-schema.json';
import {removeStorage} from '../libs/storage';
import auth, { firebase } from '@react-native-firebase/auth';
import {styles as globalStyles} from '../shared/styles';
import plans from '../resources/plans-info.json';
import { updateDeviceToken } from '../libs/services';

export default function Profile({navigation}: any) {
  const user: usuarioType = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const options = [
    /*{
      title: 'Plan',
      description: 'Información de tu plan',
      icon: <Star />,
      action: () => {},
    },*/
    {
      title: 'Historial de compras',
      description: 'Revisa a detalle todas tus compras',
      icon: <ClockCounterClockwise />,
      action: () => navigation.push('Bills'),
      hideManager: true,
    },
    {
      title: 'Versión',
      description: 'Versión alpha-0.0.1b',
      icon: <GitBranch />,
      action: null,
      hideManager: false,
    },
    {
      title: 'Cerrar sesión',
      description: `Inciaste sesión como ${user.nombre}`,
      icon: <SignOut />,
      action: () => onSignOut(),
      hideManager: false,
    },
  ];

  async function onSignOut() {
    //Delete token
    firebase.messaging().deleteToken();
    //Update token to null in server
    user.uid && await updateDeviceToken({id: user.id, token_not: null}, token);
    //Remove user
    await removeStorage({key: 'token'});
    await removeStorage({key: 'user'});
    //Signou
    dispatch(setRNUser(null));
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setSigned(false));
    if(user.rol !== "manager"){
      auth().signOut();
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.layout}>
          <Text style={globalStyles.screenTitle}>Perfil</Text>
          <Text style={globalStyles.screenDescription}>
            Información y opciones
          </Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.profilePhoto}>
            <Text style={styles.profileInitial}>
              {user.nombre.substring(0, 1)}
            </Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>
              {user.nombre} {user.apellido}
            </Text>
            <Text style={styles.userPhone}>{user.telefono}</Text>
          </View>
          {user.rol !== 'manager' && (
            <Text style={styles.planOwned}>
              {user.plansId ? (
                <Text>{plans[(user.plansId as number) - 1].name}</Text>
              ) : (
                'No tienes planes activos 😢'
              )}
            </Text>
          )}
        </View>
        <View>
          {options.map((option, key) =>
            user.rol === 'manager' && option.hideManager ? (
              null
            ) : (
              <Pressable
                key={key}
                android_ripple={{color: theme.colors.ripple}}
                style={styles.option}
                onPress={() => (option.action ? option.action() : {})}>
                <View style={styles.optionContent}>
                  <IconContext.Provider value={{color: theme.colors.border}}>
                    {option.icon}
                  </IconContext.Provider>
                  <View>
                    <Text style={styles.title}>{option.title}</Text>
                    <Text style={styles.description}>{option.description}</Text>
                  </View>
                </View>
                {option.action && <CaretRight color={theme.colors.border} />}
              </Pressable>
            ),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  optionContent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors['text-primary'],
  },
  description: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
  },
  profilePhoto: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 64,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  profileInitial: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 32,
    lineHeight: 38,
    color: theme.colors.primary,
  },
  userInfo: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  userName: {
    fontFamily: 'Jakarta-Medium',
    fontSize: 22,
    color: theme.colors['text-primary'],
  },
  userPhone: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  planOwned: {
    fontFamily: 'Jakarta-SemiBold',
    backgroundColor: theme.colors.ripple,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    color: theme.colors['text-primary'],
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
});
