import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { plantaType} from '../types';
import theme from '../resources/theme-schema.json';
import Button from '../components/Button';
import {styles as globalStyles} from '../shared/styles';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectToken, selectUser} from '../store/features/authSlice';
import {getPlantPrice} from '../libs/services';

export default function PlantDetail({navigation, route}: any) {
  const {plant}: {plant: plantaType} = route.params;
  const [price, setPrice] = useState<{precio: number; discount: number}>();
  const [ready, setReady] = useState(false);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    setReady(false);
    getPlantPrice({plantsId: plant.id, userId: user.id}, token)
      .then(data => {
        setPrice(data);
        setReady(true);
      })
      .catch(error => {
        if (error.response.status === 400) {
          setReady(true);
        }
      });
  }, []);

  function handleOnBuy() {
    navigation.navigate('Checkout', {plant: {...plant, ...price}, type: 'plant'});
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
          <Text style={styles.name}>
            {plant.nombre} {`(${plant.nombre_c})`}
          </Text>
          <Text style={styles.description}>{plant.descripcion}</Text>
        </View>
        <View style={styles.categories}>
          <Pressable style={styles.categoryChip}>
            <Text style={styles.categoryText}>{plant.categories.nombre}</Text>
          </Pressable>
        </View>
      </ScrollView>
      {price && (
        <View style={styles.options}>
          <View style={styles.priceDetail}>
            {price.discount !== 0 && (
              <Text style={styles.discount}>${price?.precio}</Text>
            )}
            <Text style={styles.price}>${price.precio - price.discount}</Text>
          </View>
          <Button
            title="Comprar"
            type="primary"
            style={{borderRadius: 20, flex: 1}}
            onPress={handleOnBuy}
          />
        </View>
      )}
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
    justifyContent: 'space-between',
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
    color: theme.colors.primary,
    flex: 1,
  },
  categories: {
    gap: 10,
    flexDirection: 'row',
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
    fontFamily: 'Jakarta-SemiBold',
  },
  discount: {
    textDecorationLine: 'line-through',
    fontSize: 24,
    color: theme.colors['text-secondary'],
    fontFamily: 'Jakarta-SemiBold',
  },
  priceDetail: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
