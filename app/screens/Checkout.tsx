import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '../components/Input';
import {styles as globalStyles} from '../shared/styles';
import {Calendar, CreditCard, Password, User} from 'phosphor-react-native';
import Button from '../components/Button';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectToken, selectUser, setUser} from '../store/features/authSlice';
import {planDetail, plantaType, usuarioType} from '../types';
import theme from '../resources/theme-schema.json';
import {buy, buyPlan} from '../libs/services';
import Loading from '../components/Loading';
import { saveObject } from '../libs/storage';

export default function Checkout({navigation, route}: any) {
  const [expireDate, setExpireDate] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardOwner, setCardOwner] = useState('');
  const [cvv, setCvv] = useState('');
  const [nick, setNick] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const user: usuarioType = useSelector(selectUser);
  const {
    plant,
    type,
    plan,
  }: {plant: plantaType; type: 'plan' | 'plant'; plan: planDetail} =
    route.params;

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
      : plant && nick.length < 3
      ? false
      : true;
  }

  async function onContinue() {

    console.log(token);

    let body =
      type === 'plan'
        ? {
            usersId: user.id,
            tipo_compra: 'plan',
            precio: plan.price,
            descuento: 0,
            f_compra: new Date().toDateString(),
            plansId: plan.id,
          }
        : {
            usersId: user.id,
            apodo: nick,
            plantsId: plant.id,
            tipo_compra: 'planta',
            precio: plant.precio,
            descuento: plant.discount,
            f_compra: new Date().toDateString(),
            zonesId: Math.floor(Math.random() * 3) + 1,
          };

    setLoading(true);

    try {
      if (type === 'plan') {
        await buyPlan(body, token);
        //update userInfo
        const _updatedUser = {
          ...user,
          plansId: plan.id
        };
        dispatch(setUser(_updatedUser));
        saveObject({key: "user", value: _updatedUser});
      }

      if (type === 'plant') await buy(body, token);

      navigation.reset({
        index: 1,
        routes: [
          {name: 'Home'},
          {name: 'Success', params: {caption: 'Gracias por tu compra 😁!'}},
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (loading)
    return <Loading fullscreen caption="Estamos procesando tu compra 😎" />;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.layout}>
          <Text style={globalStyles.screenTitle}>Resúmen de tu compra</Text>
          {type !== 'plan' && (
            <Text style={globalStyles.textAccent}>
              El precio aplicado esta sujeto a tu suscripción
            </Text>
          )}
          {plant ? (
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{plant.nombre}</Text>
              <Text style={styles.plantCName}>{plant.nombre_c}</Text>
              <View style={styles.priceDetail}>
                <Text style={styles.price}>Subtotal: ${plant.precio}</Text>
                <Text style={styles.price}>Descuento: ${plant.discount}</Text>
                <Text style={styles.total}>
                  Total a pagar: $
                  {(plant.precio as number) - (plant.discount as number)}
                </Text>
              </View>
            </View>
          ) : plan ? (
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>Plan: {plan.name}</Text>
              <Text style={styles.plantCName}>Suscripción mensual</Text>
              <View style={styles.priceDetail}>
                <Text style={styles.total}>
                  Total a pagar: ${plan.price as number}/mes
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        {plant && (
          <View style={globalStyles.layout}>
            <Text style={globalStyles.screenTitle}>Personalización</Text>
            <Text style={globalStyles.screenDescription}>
              Personaliza tu planta, escoge un nombre para identificarla
            </Text>
            <View style={styles.form}>
              <Input
                label="Apodo"
                value={nick}
                onChangeText={setNick}
                placeholder="Apodo para tu nueva planta"
              />
            </View>
          </View>
        )}
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
              onPress={onContinue}
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
  plantInfo: {
    marginTop: 20,
    borderRadius: 5,
    borderColor: theme.colors.border,
    padding: 10,
    borderWidth: 1,
  },
  plantName: {
    fontFamily: 'Jakarta-Medium',
    fontSize: 18,
    color: theme.colors['text-primary'],
  },
  plantCName: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors.primary,
  },
  priceDetail: {
    alignItems: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  price: {
    fontFamily: 'Jakarta-SemiBold',
    color: theme.colors['text-primary'],
    fontSize: 16,
  },
  total: {
    fontFamily: 'Jakarta-SemiBold',
    color: theme.colors.primary,
    fontSize: 18,
  },
});
