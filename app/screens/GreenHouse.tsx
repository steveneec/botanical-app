import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import {useEffect, useState} from 'react';
import {plantaCompradaType, usuarioType} from '../types';
import PlantGHCard from '../components/PlantGHCard';
import { getPlantsByUser } from '../libs/services';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../store/features/authSlice';
import Loading from '../components/Loading';

export default function GreenHouse({navigation}: any) {
  const [plants, setPlants] = useState<plantaCompradaType[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const user: usuarioType = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    getPlantas();
  }, []);

  function getPlantas() {
    console.log(token);
    setReady(false);
    getPlantsByUser({userId: `${user.id}`}, token)
    .then(data => {
      console.log(data);
      setPlants(data);
      setReady(true);
      
    })
    .catch(error => console.log(error))
  }

  function onSeePlant(plant: plantaCompradaType) {
    navigation.navigate('OwnedPlantDetails', {plant});
  }

  if(!ready) return <Loading fullscreen/>

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
