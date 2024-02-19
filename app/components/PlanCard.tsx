import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {planDetail} from '../types';
import theme from '../resources/theme-schema.json';

export default function PlanCard(props: props) {
  return (
    <View style={styles.layout}>
      <Pressable
        style={styles.card}
        android_ripple={{color: theme.colors.ripple}}
        onPress={() => props.onPress()}>
        <View style={styles.header}>
          <Text style={styles.name}>{props.plan.name}</Text>
          <Text style={styles.price}>${props.plan.price}</Text>
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {props.plan.shortDescription}
        </Text>
        <View style={styles.benefits}>
          {props.plan.benefits.map((benefit, key) => (
            <Text key={key} style={styles.benefit}>
              🍃 {benefit}
            </Text>
          ))}
        </View>
        <View style={styles.other}>
          <Text style={styles.montly}>Suscripción mensual</Text>
          <Text style={styles.montly}>
            ${props.plan.plantPrice} por cada planta adicional
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

interface props {
  plan: planDetail;
  onPress: Function;
}

const styles = StyleSheet.create({
  layout: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: theme.colors['background-transparent'],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 10,
    width: Dimensions.get('window').width * 0.6,
    maxWidth: 600,
    flex: 1,
  },
  name: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 24,
    color: theme.colors['text-primary'],
  },
  description: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-secondary'],
    marginTop: 10,
  },
  montly: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  benefits: {
    marginVertical: 10,
    paddingLeft: 10,
    gap: 10,
  },
  benefit: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors['text-primary'],
  },
  other: {
    marginVertical: 10,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: 'Jakarta-Bold',
    color: theme.colors.primary,
    fontSize: 48,
  },
});
