import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

interface AppInterface {
  onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback;
}

export const AppContext = React.createContext<AppInterface>({
  onAuthStateChanged: () => {},
});

export function AppContextProvider(props:PropsWithChildren) {
    const [ready, setReady] = useState(false);

  useEffect(() => {
    const suscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return suscriber;
  }, []);

  function onAuthStateChanged(user: any) {
    if (user) {
      console.log(user);
    }
  }

  return <AppContext.Provider value={{onAuthStateChanged}}>
    {props.children}
  </AppContext.Provider>
}
