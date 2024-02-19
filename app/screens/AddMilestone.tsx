import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {styles as globalStyles} from '../shared/styles';
import theme from '../resources/theme-schema.json';
import Input from '../components/Input';
import {plantaCompradaType, plantaType, usuarioType} from '../types';
import Button from '../components/Button';
import {User, UserCircle} from 'phosphor-react-native';
import {useState} from 'react';
import Loading from '../components/Loading';
import {addMilestone} from '../libs/services';

export default function AddMilestone({navigation, route}: any) {
  const [milestone, setMilestone] = useState('');
  const {plant}: {plant: plantaCompradaType} = route.params;
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const {users}: {users: usuarioType} = plant;

  function onSave() {
    setLoading(true);
    addMilestone({
      descripcion: '',
      des_corta: milestone,
      f_hito: new Date().toDateString(),
      pplantsId: plant.id,
    })
      .then(() => {
        navigation.reset({
          index: 1,
          routes: [
            {name: 'Home'},
            {
              name: 'Success',
              params: {caption: 'Gracias por agrear un nuevo hito 😁!'},
            },
          ],
        });
      })
      .catch(error => console.log(error));
  }

  if (loading) return <Loading fullscreen caption="Guardando hito 😊" />;

  return (
    <SafeAreaView>
      <ScrollView style={globalStyles.scrollLayout}>
        <View>
          <View>
            <Text style={styles.sectionTitle}>Planta</Text>
            <Text style={globalStyles.screenDescription}>
              Agregarás hito a esta planta
            </Text>
          </View>
          <View style={styles.plantInfo}>
            <Image
              style={styles.image}
              source={{uri: (plant.plants as plantaType).url_foto}}
            />
            <View>
              <Text style={styles.plantNick}>{plant.apodo}</Text>
              <Text style={styles.plantName}>
                {(plant.plants as plantaType).nombre}{' '}
                {`(${(plant.plants as plantaType).nombre_c})`}
              </Text>
              <View style={styles.user}>
                <UserCircle color={theme.colors['text-secondary']} size={18} />
                <Text style={styles.userName}>
                  {users.nombre} {users.apellido}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.sectionTitle}>Información</Text>
            <Text style={globalStyles.screenDescription}>
              Información sobre el Hito, se agregará con la fecha actual
            </Text>
          </View>
          <View style={styles.form}>
            <Input label="Hito" value={milestone} onChangeText={setMilestone} />
            {/*<Input label="Descripcion" numberOfLines={4} multiline />*/}
            <Button title="Guardar Hito" type="primary" onPress={onSave} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors.primary,
    fontSize: 16,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  plantInfo: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
  form: {
    marginTop: 20,
    gap: 10,
  },
  plantNick: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 22,
    color: theme.colors['text-primary'],
  },
  plantName: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 16,
    color: theme.colors.primary,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  userName: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 16,
    color: theme.colors['text-secondary'],
  },
});
