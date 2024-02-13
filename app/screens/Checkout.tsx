import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../components/Input';
import {styles as globalStyles} from '../shared/styles';
import {Calendar, CreditCard, Password, User} from 'phosphor-react-native';
import Button from '../components/Button';
import {useState} from 'react';

export default function Checkout({navigation, route}: any) {
  const [expireDate, setExpireDate] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardOwner, setCardOwner] = useState('');
  const [cvv, setCvv] = useState('');

  function handleCheckExpireDate(inputText: string) {
    const cleanedInput = inputText.replace(/[^0-9]/g, '');
    if (cleanedInput.length <= 2) {
      setExpireDate(cleanedInput);
    } else {
      const month = cleanedInput.slice(0, 2);
      const year = cleanedInput.slice(2, 4);
      setExpireDate(`${month}/${year}`);
    }
  }

  function checkForm() {
    return cardOwner.length < 8
      ? false
      : cardNumber.length !== 16
      ? false
      : expireDate.length !== 5
      ? false
      : cvv.length !== 3
      ? false
      : true;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.layout}>
          <Text style={globalStyles.screenTitle}>Resúmen de tu compra</Text>
          <View></View>
          <Text style={globalStyles.textAccent}>
            El precio aplicado esta sujeto a tu suscripción
          </Text>
        </View>
        <View style={globalStyles.layout}>
          <Text style={globalStyles.screenTitle}>Información de Pago</Text>
          <Text style={globalStyles.screenDescription}>
            Proporciona tu información de pago para completar la compra
          </Text>
          <View style={styles.form}>
            <Input
              icon={<User />}
              label="Nombre titular de tarjeta"
              value={cardOwner}
              onChangeText={setCardOwner}
            />
            <Input
              icon={<CreditCard />}
              label="Numero de tarjeta"
              keyboardType="number-pad"
              maxLength={16}
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <View style={styles.dateCVVContainer}>
              <Input
                icon={<Calendar />}
                label="Fecha de caducidad"
                placeholder="MM/AA"
                maxLength={5}
                keyboardType="number-pad"
                value={expireDate}
                onChangeText={handleCheckExpireDate}
              />
              <Input
                icon={<Password />}
                label="CVV"
                keyboardType="number-pad"
                maxLength={3}
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
            <Button
              title="Confirmar Pago"
              type="primary"
              disabled={!checkForm()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateCVVContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  form: {
    marginVertical: 10,
    gap: 10,
  },
});
