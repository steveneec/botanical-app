import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {styles as globalStyles} from '../shared/styles';
import theme from '../resources/theme-schema.json';
import Input from '../components/Input';
import {plantaCompradaType, plantaType} from '../types';
import Button from '../components/Button';

export default function AddMilestone({navigation, route}: any) {
  //const {plant}: {plant: plantaCompradaType} = route.params;

  const plant: plantaCompradaType = {
    id: 1,
    apodo: 'Lau 🌱',
    id_planta: {
      id: 1,
      nombre: 'Laurel',
      nombre_c: 'Laurus Nobilis',
      descripcion:
        'El laurel (Laurus nobilis) es una especie de planta perenne de la familia de las lauráceas originaria de la región del mar Mediterráneo y de la mitad norte de la costa atlántica de la península ibérica. Sus hojas son utilizadas con fines medicinales y en la cocina.',
      url_foto:
        'https://cdn.britannica.com/62/184662-050-433A27B8/Bay-laurel.jpg',
      id_categoria: [
        {id: 1, nombre: 'Maderable'},
        {id: 2, nombre: 'Medicinal'},
      ],
    },
    id_usuario: {
      id: 1,
      nombre: 'Steven',
      apellido: 'Erraez',
      id_planes: 1,
      rol: '',
      telefono: '',
      genero: '',
      f_nac: '',
      email: '',
    },
    encargado: 1,
    id_zona: {
      id: 1,
      nombre: 'Z001',
      descripcion: 'Quito',
      coordenadas: '',
    },
  };

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
          <View>
            <Image source={{uri: (plant.id_planta as plantaType).url_foto}}/>
            <View></View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.sectionTitle}>Información</Text>
            <Text style={globalStyles.screenDescription}>
              Información sobre el Hito, se agregará con la fecha actual
            </Text>
          </View>
          <View>
            <Input label="Hito" />
            <Input label="Descripcion" numberOfLines={4} multiline />
            <Button title="Enviar Hito" type="primary" />
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
});
