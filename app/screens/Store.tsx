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
import {categoriaType, plantaType} from '../types';
import {
  PlantStoreCardFull,
  PlnatStoreCardSmall,
} from '../components/PlantStoreCard';

export default function Store({navigation}: any) {
  const [plants, setPlants] = useState<plantaType[]>([]);
  const [categories, setCategories] = useState<categoriaType[]>([]);

  useEffect(() => {
    getPlants();
    getCategories();
  }, []);

  function getPlants() {
    const _plants = new Array<plantaType>(5).fill({
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
      precio: 10,
    });

    setPlants(_plants);
  }

  function getCategories() {
    const _categories = new Array<categoriaType>(10).fill({
      id: 1,
      nombre: 'Categoria',
    });

    setCategories(_categories);
  }

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
                      android_ripple={{color: theme.colors.ripple}}>
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
                  onPress={() => navigation.navigate('PlantDetail', {plant})}
                />
              ))}
            </View>
          </View>
          <View style={[globalStyles.layout, {paddingBottom: 0}]}>
            <Text style={styles.sectionTitle}>Recomendadas</Text>
            <Text style={globalStyles.screenDescription}>
              Nuestra recomendación personalizada para tí
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={[globalStyles.scrollLayout, {gap: 10}]}
            horizontal>
            {plants.map((plant, key) => (
              <PlnatStoreCardSmall
                key={key}
                plant={plant}
                onPress={() => navigation.navigate('PlantDetail', {plant})}
              />
            ))}
          </ScrollView>
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
