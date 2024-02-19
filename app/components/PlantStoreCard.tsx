import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {categoriaType, plantaType} from '../types';
import theme from '../resources/theme-schema.json';

export function PlantStoreCardFull(props: props) {
  return (
    <View style={stylesFull.layout}>
      <Pressable
        style={stylesFull.card}
        android_ripple={{color: theme.colors.ripple}}
        onPress={() => props.onPress()}>
        <View style={stylesFull.info}>
          <Text style={stylesFull.name} numberOfLines={1}>
            {props.plant.nombre} {`(${props.plant.nombre_c})`}
          </Text>
          <Text numberOfLines={4} style={stylesFull.description}>
            {props.plant.descripcion}
          </Text>
          <Text style={stylesFull.categories}>
            {(props.plant.categories as categoriaType).nombre}
          </Text>
          {/*<Text style={stylesFull.price}>${props.plant.precio}</Text>*/}
        </View>
        <Image source={{uri: props.plant.url_foto}} style={stylesFull.image} />
      </Pressable>
    </View>
  );
}

const stylesFull = StyleSheet.create({
  layout: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  card: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    backgroundColor: `${theme.colors.background}e0`,
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 10,
    marginLeft: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  info: {
    gap: 2,
    flex: 1,
  },
  name: {
    fontFamily: 'Jakarta-Bold',
    color: theme.colors['text-primary'],
    fontSize: 24,
  },
  description: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
  },
  categories: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors.primary,
  },
  price: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 24,
    color: theme.colors['text-primary'],
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors['text-primary'],
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
});

export function PlnatStoreCardSmall(props: props) {
  return (
    <View style={stylesSmall.layout}>
      <Pressable
        style={stylesSmall.card}
        android_ripple={{color: theme.colors.ripple}}
        onPress={() => props.onPress()}>
        <Image source={{uri: props.plant.url_foto}} style={stylesSmall.image} />
        <View>
          <Text style={stylesSmall.name}>{props.plant.nombre}</Text>
          <Text numberOfLines={3} style={stylesSmall.description}>
            {props.plant.descripcion}
          </Text>
         {/*<Text style={stylesSmall.price}>${props.plant.precio}</Text>*/}
        </View>
      </Pressable>
    </View>
  );
}

const stylesSmall = StyleSheet.create({
  layout: {
    overflow: 'hidden',
    borderRadius: 10,
    maxWidth: Dimensions.get("window").width * 0.5 - 25,
    width: "100%"
  },
  card: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    gap: 10,
    backgroundColor: `${theme.colors.background}e0`,
  },
  image: {
    width: "auto",
    height: 150,
    borderRadius: 8,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  name: {
    fontFamily: 'Jakarta-Bold',
    color: theme.colors['text-primary'],
    fontSize: 16,
  },
  description: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
  },
  price: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 24,
    color: theme.colors['text-primary'],
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors['text-primary'],
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
});

interface props {
  plant: plantaType;
  onPress: Function;
}
