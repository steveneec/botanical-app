import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {plantaCompradaType, plantaType, zonaType} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../resources/theme-schema.json';
import {MapPin} from 'phosphor-react-native';
import { useEffect } from 'react';

export default function PlantGHCard(props: props) {
  return (
    <ImageBackground
      source={{
        uri: (props.plant.plants as plantaType).url_foto,
      }}
      resizeMode="cover"
      style={styles.card}>
      <LinearGradient colors={['#00000000', '#000000a2']} style={{flex: 1}}>
        <Pressable
          style={{flex: 1}}
          android_ripple={{color: '#388e3c0f'}}
          onPress={() => props.onPress()}>
          <View style={styles.plantInfoContainer}>
            <Text style={styles.plantAlias}>{props.plant.apodo}</Text>
            <Text style={styles.plantName}>{`${
              (props.plant.plants as plantaType).nombre_c
            } (${(props.plant.plants as plantaType).nombre})`}</Text>
            <View style={styles.plantZone}>
              <MapPin color="white" size={14} />
              <Text style={styles.plantZoneName}>
                {(props.plant.zones as zonaType).nombre} -{' '}
                {(props.plant.zones as zonaType).descripcion}
              </Text>
            </View>
          </View>
        </Pressable>
      </LinearGradient>
    </ImageBackground>
  );
}

interface props {
  plant: plantaCompradaType;
  onPress: Function;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
    height: 300,
    backgroundColor: "white"
  },
  plantInfoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    gap: 2,
  },
  plantAlias: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 24,
    color: 'white',
  },
  plantName: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors.primary,
  },
  plantZone: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  plantZoneName: {
    fontFamily: 'Jakarta-Regular',
    color: 'white',
  },
});
