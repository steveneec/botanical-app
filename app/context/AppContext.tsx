import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {StatusBar} from 'react-native';
import theme from '../resources/theme-schema.json';
import {useDispatch} from 'react-redux';
import {
  setRNUser,
  setSigned,
  setToken,
  setUser,
} from '../store/features/authSlice';
import {getObject, getString, saveObject, saveString} from '../libs/storage';
import {signin} from '../libs/services';
import Loading from '../components/Loading';

interface AppInterface {
  onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback;
}

export const AppContext = React.createContext<AppInterface>({
  onAuthStateChanged: () => {},
});

export function AppContextProvider(props: PropsWithChildren) {
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const suscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return suscriber;
  }, []);

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
