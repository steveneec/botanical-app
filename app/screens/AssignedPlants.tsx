import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import theme from '../resources/theme-schema.json';
import {plantaCompradaType, usuarioType} from '../types';
import {useEffect, useState} from 'react';
import PlantAssignedCard from '../components/PlantAssignedCard';
import { getAssignedPlants, getStorePopularPlants } from '../libs/services';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/features/authSlice';

export default function AssignedPlants({navigation}: any) {
  const [plants, setPlants] = useState<plantaCompradaType[]>([]);
  const user: usuarioType = useSelector(selectUser)

  useEffect(() => {
    getPlantas();
  }, []);

  function getPlantas() {
    getAssignedPlants({managerId: user.id})
    .then(data => {
      setPlants(data)
    })
    .catch(error => console.log(error))
  }

  function handleOnSeePlant(plant: any) {
    navigation.navigate('OwnedPlantDetails', {plant});
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
