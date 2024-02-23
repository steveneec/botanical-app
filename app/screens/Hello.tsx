import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../resources/theme-schema.json';
import Button from '../components/Button';
import {Suspense} from 'react';

export default function Hello({navigation}: any) {
  function onNavigate() {
    navigation.replace('AuthNumber');
  }

  return (
    <Suspense fallback={null}>
      <ImageBackground
        source={require('../resources/images/background.jpg')}
        style={styles.background}>
        <LinearGradient colors={['#00000000', '#000000a2']} style={{flex: 1}}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={require('../resources/images/logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>
              Únete a miles de personas que están haciendo posible un mundo más
              <Text style={styles.accent}> verde</Text>
            </Text>
            <Button
              title="COMENZAR"
              type="primary"
              onPress={onNavigate}
              style={{borderRadius: 50, alignSelf: 'center', width: '60%'}}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 60,
  },
  info: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    paddingBottom: 100,
    gap: 20,
  },
  infoText: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 32,
    color: 'white',
  },
  accent: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 32,
    color: theme.colors.primary,
  },
});
