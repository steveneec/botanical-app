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
  usuarioType,
  zonaType,
} from '../types';
import theme from '../resources/theme-schema.json';
import {styles as globalStyles} from '../shared/styles';
import {CaretRight, ClockCountdown, MapPin, Plant} from 'phosphor-react-native';
import {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {useSelector} from 'react-redux';
import {selectToken, selectUser} from '../store/features/authSlice';
import {getMilestones} from '../libs/services';
import Loading from '../components/Loading';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import { delay } from '../shared';

export default function OwnedPlantDetails({navigation, route}: any) {
  const {plant}: {plant: plantaCompradaType} = route.params;
  const token = useSelector(selectToken);
  //@ts-ignore
  const {plants}: {plants: plantaType} = plant;
  const [milestones, setMilestones] = useState<hitoType[]>([]);
  const [loadingMilestones, setLoadingMilestones] = useState(true);

  const user: usuarioType = useSelector(selectUser);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    await delay(1000)
    _getMilestones();
  }

  function _getMilestones() {
    getMilestones({plantaId: plant.id}, token)
      .then(data => {
        setMilestones(data);
        setLoadingMilestones(false);
      })
      .catch(error =>
        Toast.show({
          type: 'error',
          text1: 'Oops, se produjo un error 😢.',
          text2: error.message,
        }),
      );
  }

  function getLatLng() {
    const _coordinates = JSON.parse((plant.zones as zonaType).coordenadas);
    return {
      latitude: _coordinates.Lat,
      longitude: _coordinates.Long,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  }

  return (
    <SafeAreaView style={styles.layout}>
      <ScrollView>
        <Image
          source={{uri: (plant.plants as plantaType).url_foto}}
          style={styles.image}
        />
        <View style={globalStyles.layout}>
          <View>
            <Text style={styles.plantName}>{plant.apodo}</Text>
            <Text
              style={
                styles.plantCName
              }>{`${plants.nombre_c} (${plants.nombre})`}</Text>
            <Text style={styles.plantDescription}>{plants.descripcion}</Text>
          </View>
          <View style={styles.extraInfo}>
            <View style={styles.extraInfoRow}>
              <Plant size={18} />
              <Text style={styles.extraInfoText}>
                {plants.categories.nombre}
              </Text>
            </View>
            {/*<View style={styles.extraInfoRow}>
              <ClockCountdown size={18} />
              <Text style={styles.extraInfoText}>1 año</Text>
            </View>*/}
            <View style={styles.extraInfoRow}>
              <MapPin size={18} />
              <Text style={styles.extraInfoText}>
                {(plant.zones as zonaType).nombre} -{' '}
                {(plant.zones as zonaType).descripcion}
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
            {loadingMilestones && <Loading caption="Cargando tus hitos" />}
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
            {milestones.length === 0 && !loadingMilestones && (
              <Text style={styles.noMilestones}>
                Al parecer aún no se actualzaron los hitos de tu planta 😢
              </Text>
            )}
          </View>
          <View>
            <View>
              <Text style={globalStyles.screenTitle}>Zona</Text>
              <Text style={globalStyles.screenDescription}>
                Tu planta se encuentra en esta zona, podrás visitarla cuando las
                visitas guiadas se hayan habilitado
              </Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={{height: 300, width: '100%'}}
                liteMode
                region={getLatLng()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {user.rol === 'manager' && (
        <View style={globalStyles.layout}>
          <Button
            type="primary"
            title="Agregar Hito"
            onPress={() => navigation.navigate('AddMilestone', {plant})}
          />
        </View>
      )}
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
        //android_ripple={{color: theme.colors.ripple}}
        //</View>onPress={() => props.onPress()}
      >
        <Text style={styles.milInfoDescription}>
          {props.milestone.des_corta}
        </Text>
        {/*<CaretRight color={theme.colors.border} />*/}
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
  mapContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  noMilestones: {
    textAlign: 'center',
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
    marginBottom: 20,
  },
  layout: {
    flex: 1,
  },
});
