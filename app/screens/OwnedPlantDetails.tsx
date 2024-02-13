import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  categoriaType,
  hitoType,
  plantaCompradaType,
  plantaType,
  zonaType,
} from '../types';
import theme from '../resources/theme-schema.json';
import {styles as globalStyles} from '../shared/styles';
import {
  CaretRight,
  ClockCountdown,
  MapPin,
  Plant,
} from 'phosphor-react-native';
import {useEffect, useState} from 'react';

export default function OwnedPlantDetails({navigation, route}: any) {
  const {plant}: {plant: plantaCompradaType} = route.params;
  //@ts-ignore
  const {id_planta}: {id_planta: plantaType} = plant;
  const [milestones, setMilestones] = useState<hitoType[]>([]);

  useEffect(() => {
    getMilestones();
  }, []);

  function getMilestones() {
    const _milestones = new Array<hitoType>(4).fill({
      id: 1,
      id_planta: 1,
      descripcion:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quasi, nulla obcaecati explicabo excepturi maxime iure delectus. Beatae minima natus laborum maiores delectus, aut modi vitae voluptatibus facere. Beatae, sunt.',
      descripcion_corta: 'Descripcion corta',
      f_hito: '2024-02-10',
      url_foto:
        'https://mlstaticquic-a.akamaihd.net/arbol-laurel-D_NQ_NP_954957-MLU29289096504_012019-F.jpg',
    });

    setMilestones(_milestones);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={{uri: (plant.id_planta as plantaType).url_foto}}
          style={styles.image}
        />
        <View style={globalStyles.layout}>
          <View>
            <Text style={styles.plantName}>{plant.apodo}</Text>
            <Text
              style={
                styles.plantCName
              }>{`${id_planta.nombre_c} (${id_planta.nombre})`}</Text>
            <Text style={styles.plantDescription}>{id_planta.descripcion}</Text>
          </View>
          <View style={styles.extraInfo}>
            <View style={styles.extraInfoRow}>
              <Plant size={18} />
              <Text style={styles.extraInfoText}>
                {(id_planta.id_categoria as categoriaType[]).map(
                  (category, key) =>
                    `${category.nombre}${
                      key <
                      (id_planta.id_categoria as categoriaType[]).length - 1
                        ? ', '
                        : ''
                    }`,
                )}
              </Text>
            </View>
            <View style={styles.extraInfoRow}>
              <ClockCountdown size={18} />
              <Text style={styles.extraInfoText}>1 año</Text>
            </View>
            <View style={styles.extraInfoRow}>
              <MapPin size={18} />
              <Text style={styles.extraInfoText}>
                {(plant.id_zona as zonaType).nombre} -{' '}
                {(plant.id_zona as zonaType).descripcion}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={globalStyles.screenTitle}>Hitos</Text>
              <Text style={globalStyles.screenDescription}>
                Línea de tiempo con los eventos más importantes
              </Text>
            </View>
            <View style={styles.milestones}>
              {milestones.map((milestone, key) => (
                <Milestone
                  milestone={milestone}
                  key={key}
                  onPress={() =>
                    navigation.navigate('MilestoneDetail', {milestone})
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Milestone(props: props) {
  return (
    <View>
      <View style={styles.milDateContainer}>
        <View style={styles.milDatePoint} />
        <Text style={styles.milDate}>
          {new Date(props.milestone.f_hito).toDateString()}
        </Text>
      </View>
      <Pressable
        style={styles.milInfoContainer}
        android_ripple={{color: theme.colors.ripple}}
        onPress={() => props.onPress()}>
        <Text style={styles.milInfoDescription}>
          {props.milestone.descripcion_corta}
        </Text>
        <CaretRight color={theme.colors.border} />
      </Pressable>
    </View>
  );
}

interface props {
  milestone: hitoType;
  onPress: Function;
}

const styles = StyleSheet.create({
  image: {
    height: 300,
  },
  plantName: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 24,
    color: theme.colors['text-primary'],
  },
  plantCName: {
    fontFamily: 'Jakarta-Medium',
    fontSize: 18,
    color: theme.colors.primary,
  },
  plantDescription: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
    marginTop: 10,
  },
  extraInfo: {
    marginVertical: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors['border-alt'],
    borderBottomColor: theme.colors['border-alt'],
    gap: 5,
  },
  extraInfoText: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors['text-secondary'],
    fontSize: 16,
  },
  extraInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  milestones: {
    marginVertical: 20,
  },
  milDate: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors.primary,
  },
  milDatePoint: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
  },
  milDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  milInfoContainer: {
    marginHorizontal: 4,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors['text-secondary'],
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  milInfoDescription: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
    fontSize: 18,
    marginLeft: 15,
  },
});
