import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {plantaCompradaType, plantaType, usuarioType, zonaType} from '../types';
import theme from '../resources/theme-schema.json';
import {MapPin, UserCircle} from 'phosphor-react-native';

export default function PlantAssignedCard(props: props) {
  //@ts-ignore
  const {plants}: {plants: plantaType} = props.plant;

  return (
    <View style={styles.layout}>
      <Pressable
        android_ripple={{color: theme.colors.ripple}}
        style={styles.card}
        onPress={() => props.onPress()}>
        <View style={styles.info}>
          <Text style={styles.plantName} numberOfLines={1}>
            {props.plant.apodo}
          </Text>
          <Text
            style={styles.plantNameC}
            numberOfLines={
              1
            }>{`${plants.nombre} (${plants.nombre_c})`}</Text>
          <View style={{marginTop: 20, gap: 5}}>
            <View style={styles.infoRow}>
              <UserCircle size={16} color={theme.colors.border} />
              <Text style={styles.infoRowText} numberOfLines={1}>
                {(props.plant.users as usuarioType).nombre}{' '}
                {(props.plant.users as usuarioType).apellido}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MapPin size={16} color={theme.colors.border} />
              <Text style={styles.infoRowText} numberOfLines={1}>
                {(props.plant.zones as zonaType).nombre} -{' '}
                {(props.plant.zones as zonaType).descripcion}
              </Text>
            </View>
          </View>
        </View>
        <Image source={{uri: plants.url_foto}} style={styles.image} />
      </Pressable>
    </View>
  );
}

interface props {
  plant: plantaCompradaType;
  onPress: Function;
}

const styles = StyleSheet.create({
  layout: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 10,
    flexDirection: 'row',
    gap: 10
  },
  image: {
    width: 100,
    borderRadius: 6,
  },
  info: {
    flex: 1,
  },
  plantName: {
    fontFamily: 'Jakarta-Bold',
    color: theme.colors['text-primary'],
    fontSize: 24,
  },
  plantNameC: {
    fontFamily: 'Jakarta-SemiBold',
    color: theme.colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  infoRowText: {
    fontFamily: 'Jakarta-SemiBold',
    color: theme.colors['text-secondary'],
    fontSize: 16,
    lineHeight: 18,
  },
});
