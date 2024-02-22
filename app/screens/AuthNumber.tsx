import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import Input from '../components/Input';
import {Phone} from 'phosphor-react-native';
import theme from '../resources/theme-schema.json';
import Button from '../components/Button';
import {useState} from 'react';

export default function AuthNumber({navigation}: any) {
  const [phoneNumber, setPhoneNumber] = useState('');

  function checkNumber() {
    const regex = /^09/;
    return regex.test(phoneNumber) && phoneNumber.length === 10;
  }

  function onContinue() {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'AuthVerifyCode',
          params: {phone: phoneNumber},
        },
      ],
    });
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.layout}>
        <View style={styles.form}>
          <Text style={styles.authCaption}>
            Inicia sesión o Regístrate para conocer las últimas novedades
          </Text>
          <Input
            icon={<Phone />}
            label="Número de teléfono"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            maxLength={10}
          />
          <Text style={styles.smsCaption}>
            Te enviaremos un SMS con un código de confirmación para validar tu
            número de teléfono
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Continuar"
            type="primary"
            disabled={!checkNumber()}
            onPress={onContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authCaption: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 24,
    color: theme.colors['text-primary'],
  },
  smsCaption: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
  },
  form: {
    gap: 10,
  },
  button: {
    marginTop: 30,
  },
});
