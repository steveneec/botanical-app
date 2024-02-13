import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {StatusBar} from 'react-native';
import theme from '../resources/theme-schema.json';
import { useDispatch } from 'react-redux';
import { setSigned } from '../store/features/authSlice';

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

  function onAuthStateChanged(user: any) {
    if (user) {
      dispatch(setSigned(true));
    }

    setReady(true)

  }

  if(!ready){
    return null
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
