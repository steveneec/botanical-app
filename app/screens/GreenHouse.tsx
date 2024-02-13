import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import {useEffect, useState} from 'react';
import {plantaCompradaType} from '../types';
import PlantGHCard from '../components/PlantGHCard';

export default function GreenHouse({navigation}: any) {
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
      id_usuario: 1,
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

  function onSeePlant(plant: plantaCompradaType) {
    navigation.navigate('OwnedPlantDetails', {plant});
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={globalStyles.scrollLayout}>
        <View>
          <Text style={globalStyles.screenTitle}>Invernadero</Text>
          <Text style={globalStyles.screenDescription}>
            Da seguimiento a tus{' '}
            <Text style={globalStyles.textAccent}>árboles</Text> o agrega uno
            nuevo
          </Text>
        </View>
        <View style={styles.plants}>
          {plants.map((plant, key) => (
            <PlantGHCard
              plant={plant}
              key={key}
              onPress={() => onSeePlant(plant)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  plants: {
    gap: 10,
    marginTop: 20,
  },
});
