import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import {getPlantsByCategory} from '../libs/services';
import {useSelector} from 'react-redux';
import {selectToken} from '../store/features/authSlice';
import {plantaType} from '../types';
import {styles as globalStyles} from '../shared/styles';
import {PlnatStoreCardSmall} from '../components/PlantStoreCard';
import {delay} from '../shared';

export default function CategoryStore({navigation, route}: any) {
  const [plants, setPlants] = useState<plantaType[]>([]);
  const [ready, setReady] = useState(false);
  const token = useSelector(selectToken);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    await delay(1000);
    setReady(false);
    getPlantsByCategory(route.params.category.id, token)
      .then(data => {
        setPlants(data);
        setReady(true);
      })
      .catch(error => console.log(error));
  }

  if (!ready) return <Loading fullscreen />;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={globalStyles.scrollLayout}>
        <View style={styles.plants}>
          {plants.map((plant, key) => (
            <PlnatStoreCardSmall
              plant={plant}
              key={key}
              onPress={() => navigation.navigate('PlantDetail', {plant})}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  plants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
