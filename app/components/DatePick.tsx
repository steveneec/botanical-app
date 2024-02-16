import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import theme from '../resources/theme-schema.json';
import {Calendar} from 'phosphor-react-native';

export default function DatePick(props: props) {
  return (
    <View style={styles.layout}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.container}>
        <Pressable
          onPress={() => props.onPress()}
          android_ripple={{color: theme.colors.ripple}}
          style={styles.pressable}>
          <Calendar color={theme.colors.border} size={18}/>
          <Text style={styles.dateText}>{props.date.toLocaleDateString()}</Text>
        </Pressable>
      </View>
      <DatePicker
        modal
        date={props.date}
        open={props.open}
        onConfirm={date => props.onConfirm(date)}
        onCancel={() => props.onCancel()}
        mode="date"
      />
    </View>
  );
}

interface props {
  label: string;
  open: boolean;
  onPress: Function;
  date: Date;
  onConfirm: Function;
  onCancel: Function;
}

const styles = StyleSheet.create({
  layout: {
    gap: 5,
  },
  container: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  label: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors.primary,
  },
  dateText: {
    fontFamily: 'Jakarta-Medium',
    color: theme.colors['text-primary'],
    fontSize: 18,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
    paddingLeft: 10
  },
  pressable: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
});
