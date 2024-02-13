import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import theme from '../resources/theme-schema.json';
import {plantaCompradaType} from '../types';
import {useEffect, useState} from 'react';
import PlantAssignedCard from '../components/PlantAssignedCard';

export default function AssignedPlants({navigation}: any) {
  const [plants, setPlants] = useState<plantaCompradaType[]>([]);

  useEffect(() => {
    getPlantas();
  }, []);

  function getPlantas() {
    //use mocks
    const _plants = new Array<plantaCompradaType>(10).fill({
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
    });

    setPlants(_plants);
  }

  function handleOnSeePlant(plant: plantaCompradaType) {
    navigation.navigate('PlantAssignedDetail', {plant});
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.layout}>
          <Text style={globalStyles.screenTitle}>Mis plantas 🌱</Text>
          <Text style={globalStyles.screenDescription}>
            Gestiona las plantas que se te asignaron
          </Text>
        </View>
        <View style={styles.plants}>
          {plants.map((plant, key) => (
            <PlantAssignedCard
              plant={plant}
              key={key}
              onPress={() => handleOnSeePlant(plant)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  plants: {
    padding: 20,
    gap: 10,
  },
});
