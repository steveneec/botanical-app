import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import theme from '../resources/theme-schema.json';
import {useEffect, useState} from 'react';
import {categoriaType, planDetail, plantaType, usuarioType} from '../types';
import {
  PlantStoreCardFull,
  PlnatStoreCardSmall,
} from '../components/PlantStoreCard';
import {getCategories, getStorePopularPlants} from '../libs/services';
import Loading from '../components/Loading';
import {useSelector} from 'react-redux';
import {selectUser} from '../store/features/authSlice';
import plans from '../resources/plans-info.json';
import PlanCard from '../components/PlanCard';

export default function Store({navigation}: any) {
  const [plants, setPlants] = useState<plantaType[]>([]);
  const [categories, setCategories] = useState<categoriaType[]>([]);
  const [ready, setReady] = useState(false);

  const user: usuarioType = useSelector(selectUser);

  useEffect(() => {
    init();
  }, []);

  function init() {
    setReady(false);
    Promise.all([getCategories(), getStorePopularPlants()])
      .then(data => {
        setCategories(data[0]);
        setPlants(data[1]);
        setReady(true);
      })
      .catch(error => console.log(error));
  }

  if (!ready) return <Loading fullscreen />;

  return (
    <SafeAreaView style={styles.layoutBackground}>
      <View style={styles.layoutBackground}>
        <Image
          source={require('../resources/images/store_0.png')}
          style={styles.imageBg0}
          resizeMode="contain"
        />
        <ScrollView style={{...StyleSheet.absoluteFillObject}}>
          <View style={globalStyles.layout}>
            <Text style={globalStyles.screenTitle}>Tienda</Text>
            <Text style={globalStyles.screenDescription}>
              Explora todas las{' '}
              <Text style={globalStyles.textAccent}>plantas</Text> disponibles,
              te ofrecemos una{' '}
              <Text style={globalStyles.textAccent}>
                experiencia personalizada
              </Text>{' '}
              al momento de elegir una.
            </Text>
          </View>
          {!user.plansId && (
            <>
              <View style={globalStyles.layout}>
                <Text style={styles.sectionTitle}>Planes</Text>
                <Text style={globalStyles.screenDescription}>
                  Aun no estás suscrito a ningún plan, hechale un vistazo a los
                  beneficios
                </Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{padding: 20, gap: 10}}>
                {
                  //@ts-ignore
                  (plans as planDetail[]).map((plan, key) => (
                    <PlanCard
                      plan={plan}
                      key={key}
                      onPress={() => navigation.navigate('Checkout', {plan, type: "plan"})}
                    />
                  ))
                }
              </ScrollView>
            </>
          )}
          <View>
            <View style={globalStyles.layout}>
              <Text style={styles.sectionTitle}>Categorías</Text>
              <Text style={globalStyles.screenDescription}>
                Explora nuestras categorías
              </Text>
              <View style={styles.categories}>
                {categories.map((category, key) => (
                  <View
                    style={{borderRadius: 20, overflow: 'hidden'}}
                    key={key}>
                    <Pressable
                      style={styles.categoryChip}
                      android_ripple={{color: theme.colors.ripple}}
                      onPress={() =>
                        navigation.navigate('CategoryStore', {category})
                      }>
                      <Text style={styles.caregoryChipText}>
                        {category.nombre}
                      </Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={globalStyles.layout}>
            <Text style={styles.sectionTitle}>Populares</Text>
            <Text style={globalStyles.screenDescription}>
              Las más compradas
            </Text>
            <View style={styles.popularPlants}>
              {plants.map((plant, key) => (
                <PlantStoreCardFull
                  key={key}
                  plant={plant}
                  onPress={() => navigation.navigate('PlantDetail', {plant, type: "plant"})}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Jakarta-Medium',
    fontSize: 18,
    color: theme.colors.primary,
  },
  layoutBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  imageBg0: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.2,
    right: '-100%',
    height: 300,
    flex: 1,
  },
  popularPlants: {
    marginVertical: 10,
    gap: 10,
  },
  categories: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  categoryChip: {
    backgroundColor: theme.colors['background-transparent'],
    borderWidth: 1,
    borderColor: theme.colors['text-primary'],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    width: 'auto',
  },
  caregoryChipText: {
    color: theme.colors['text-primary'],
    fontFamily: 'Jakarta-Bold',
    fontSize: 18,
    lineHeight: 22,
  },
});
