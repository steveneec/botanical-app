import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {categoriaType, plantaType} from '../types';
import theme from '../resources/theme-schema.json';
import Button from '../components/Button';
import {styles as globalStyles} from '../shared/styles';

export default function PlantDetail({navigation, route}: any) {
  const {plant}: {plant: plantaType} = route.params;

  function handleOnBuy(){
    navigation.navigate("Checkout", plant);
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <ScrollView>
        <Image
          source={{uri: plant.url_foto}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={globalStyles.layout}>
          <Text style={styles.name}>{plant.nombre}</Text>
          <Text style={styles.description}>{plant.descripcion}</Text>
        </View>
        <View style={styles.categories}>
          {(plant.id_categoria as categoriaType[]).map((category, key) => (
            <Pressable style={styles.categoryChip} key={key}>
              <Text style={styles.categoryText}>{category.nombre}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View style={styles.options}>
        <Text style={styles.price}>${plant.precio}</Text>
        <Button
          title="Comprar"
          type="primary"
          style={{borderRadius: 20, flex: 1}}
          onPress={handleOnBuy}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
  },
  content: {
    backgroundColor: theme.colors.background,
    padding: 20,
    flex: 1,
  },
  options: {
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 10,
    flexDirection: 'row',
    gap: 10,
  },
  name: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 24,
    color: theme.colors['text-primary'],
  },
  description: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
  },
  price: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 32,
    color: theme.colors['text-primary'],
    flex: 1,
  },
  categories: {
    gap: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  categoryChip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: theme.colors['text-primary'],
  },
  categoryText: {
    fontSize: 16,
    color: theme.colors['text-primary'],
    fontFamily: "Jakarta-SemiBold"
  },
});
