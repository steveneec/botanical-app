import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import Input from '../components/Input';
import Button from '../components/Button';
import {At} from 'phosphor-react-native';
import {useState} from 'react';
import Dropdown from '../components/Dropdown';
import DatePick from '../components/DatePick';
import {register} from '../libs/services';
import {useDispatch, useSelector} from 'react-redux';
import {selectRNUser, setToken, setUser} from '../store/features/authSlice';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { saveObject, saveString } from '../libs/storage';

export default function CompleteProfile() {
  const [gender, setGender] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [datePickOpen, setDatePickOpen] = useState(false);
  const [bornDate, setBornDate] = useState(new Date());
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const rnUser: FirebaseAuthTypes.User = useSelector(selectRNUser);

  const dispatch = useDispatch()

  const genders: {label: string; value: string}[] = [
    {label: 'Hombre', value: 'MALE'},
    {label: 'Mujer', value: 'FEMALE'},
    {label: "No binario", value: "FLUID"},
    {label: "Prefiero no decirlo", value:"UNKNOWN"}
  ];

  function handleOnConfirmDate(date: Date) {
    setBornDate(date);
    setDatePickOpen(false);
  }

  function checkForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return name.length < 3
      ? false
      : lastname.length < 3
      ? false
      : email.length < 10
      ? false
      : gender === ''
      ? false
      : !emailRegex.test(email)
      ? false
      : true;
  }

  async function handleOnContinue() {
    try {
      const result = await register({
        nombre: name,
        apellido: lastname,
        email,
        telefono: rnUser.phoneNumber,
        genero: gender,
        f_nac: bornDate,
        uid: rnUser.uid
      });
      
      //Save local storge
      saveString({key: "token", value: result.token});
      saveObject({key: "user", value: result.user.userInfo});

      //Set store data
      dispatch(setToken(result.token));
      dispatch(setUser(result.user.userInfo));
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={globalStyles.scrollLayout}>
        <Text style={globalStyles.screenTitle}>Completa tu perfil</Text>
        <Text style={globalStyles.screenDescription}>
          Ya casi estamos listos, necesitamos algo de información extra para
          continuar.
        </Text>
        <View style={styles.form}>
          <Input label="Nombre" value={name} onChangeText={setName} />
          <Input label="Apellido" value={lastname} onChangeText={setLastname} />
          <Input
            label="Email"
            icon={<At />}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Dropdown
            setIsFocus={setIsFocus}
            setValue={setGender}
            value={gender}
            isFocus={isFocus}
            data={genders}
            placeholder="Selecciona tu género"
            label="Género"
          />
          <DatePick
            label="Fecha de nacimiento"
            date={bornDate}
            open={datePickOpen}
            onPress={() => setDatePickOpen(true)}
            onCancel={() => setDatePickOpen(false)}
            onConfirm={handleOnConfirmDate}
          />
        </View>
        <View>
          <Button title="Continuar" type="primary" disabled={!checkForm()} onPress={handleOnContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
    gap: 10,
  },
});
