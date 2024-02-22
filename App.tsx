import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './app/navigation';
import {AppContextProvider} from './app/context/AppContext';
import {Provider} from 'react-redux';
import store from './app/store';
import {enableLatestRenderer} from 'react-native-maps';
import theme from './app/resources/theme-schema.json';
import Toast from 'react-native-toast-message';
import { toastConfig } from './app/shared';

enableLatestRenderer();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContextProvider>
          <Navigation />
        </AppContextProvider>
      </Provider>
      <Toast config={toastConfig} topOffset={10}/>
    </SafeAreaProvider>
  );
}
