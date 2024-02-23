import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import theme from '../resources/theme-schema.json';
import {useEffect, useState} from 'react';
import {getPlant} from '../libs/services';
import {useSelector} from 'react-redux';
import {selectToken} from '../store/features/authSlice';
import {delay} from '../shared';
import Loading from '../components/Loading';
import {plantaType} from '../types';
import {PlantStoreCardFull} from '../components/PlantStoreCard';

export default function RecommendationResult({navigation, route}: any) {
  const {recommendation} = route.params;
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectToken);
  const [plant, setPlant] = useState<plantaType>();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    await delay(1000);
    getPlant({plantsId: recommendation.plantId}, token)
      .then(data => {
        setPlant(data[0]);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  if (loading) return <Loading fullscreen />;

  return (
    <SafeAreaView>
      <View style={globalStyles.layout}>
        <Text style={globalStyles.screenTitle}>Tu recomendación 😎</Text>
        <Text style={globalStyles.screenDescription}>
          Según tus respuestas, te tenemos la siguiente recomendación
        </Text>
      </View>
      <View style={styles.content}>
      <PlantStoreCardFull
          plant={plant as plantaType}
          onPress={() =>
            navigation.navigate('PlantDetail', {plant, type: 'plant'})
          }
        />
        <Text style={styles.recommendation}>
          {recommendation.recommendation}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  recommendation: {
    fontFamily: 'Jakarta-Regular',
    fontSize: 16,
    color: theme.colors['text-primary'],
    marginTop: 20
  },
  content: {
    paddingHorizontal: 20,
  },
});
