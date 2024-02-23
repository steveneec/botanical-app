import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert, StatusBar} from 'react-native';
import theme from '../resources/theme-schema.json';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectToken,
  selectUser,
  setRNUser,
  setSigned,
  setToken,
  setUser,
} from '../store/features/authSlice';
import {getObject, getString, saveObject, saveString} from '../libs/storage';
import {signin, updateDeviceToken} from '../libs/services';
import Loading from '../components/Loading';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import {usuarioType} from '../types';
import Toast from 'react-native-toast-message';

interface AppInterface {
  onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback;
}

export const AppContext = React.createContext<AppInterface>({
  onAuthStateChanged: () => {},
});

export function AppContextProvider(props: PropsWithChildren) {
  const [ready, setReady] = useState(false);

  const user: usuarioType = useSelector(selectUser);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Toast.show({
        type: "success",
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body
      })
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const suscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return suscriber;
  }, []);

  useEffect(() => {
    updateToken();
  }, [user]);

  async function updateToken() {
    if (user) {
      console.log(user);
      if (!user.token_not && user.uid) {
        console.log("Try to update token");
        //update token
        const _deviceToken = await firebase.messaging().getToken();
        updateDeviceToken({id: user.id, token_not: _deviceToken}, token)
          .then(() => {
            const _updatedUser = {...user, token_not: _deviceToken};
            dispatch(setUser(_updatedUser));
            saveObject({key:"user", value: _updatedUser});
          })
          .catch(error =>
            Toast.show({
              type: 'error',
              text1: 'Error 😢',
              text2:
                'Ocurrió un error al intentar actualizar el token de notificaciones',
            }),
          );
      }
    }
  }

  async function getDeviceToken() {
    const _deviceToken = await firebase.messaging().getToken();
    if (_deviceToken) {
      console.log('getDeviceToken:', _deviceToken);
    } else {
      console.log('no device token found!');
    }
  }

  async function requestFCMPermissions() {
    try {
      await firebase.messaging().requestPermission();
      getDeviceToken();
    } catch (error) {
      console.log(error);
    }
  }

  async function requestUserPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getDeviceToken();
    } else {
      requestFCMPermissions();
    }

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  async function onAuthStateChanged(user: any) {
    if (user) {
      dispatch(setRNUser(user));

      try {
        //check if exist user in localstorage
        let _user = await getObject({key: 'user'});
        let _token = null;

        if (!_user) {
          //try to signin
          _user = await signin({uid: user.uid});
          _token = _user.token;
          await saveString({key: 'token', value: _token});
          _user = _user.user.userInfo;
        } else {
          _token = await getString({key: 'token'});
        }

        await saveObject({key: 'user', value: _user});
        //Set data store
        dispatch(setToken(_token));
        dispatch(setUser(_user));
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log("user doesn't exist... please complete the info...");
        }
      }
      dispatch(setSigned(true));
    } else {
      let _user = await getObject({key: 'user'});
      if (_user) {
        dispatch(setUser(_user));
        dispatch(setSigned(true));
      }
    }
    setReady(true);
  }

  if (!ready) {
    return <Loading fullscreen />;
  }

  return (
    <AppContext.Provider value={{onAuthStateChanged}}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      {props.children}
    </AppContext.Provider>
  );
}
