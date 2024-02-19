import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './app/navigation';
import {AppContextProvider} from './app/context/AppContext';
import {Provider} from 'react-redux';
import store from './app/store';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContextProvider>
          <Navigation />
        </AppContextProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
