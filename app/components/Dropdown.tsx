import {StyleSheet, Text, View} from 'react-native';
import {Dropdown as RNDropdown} from 'react-native-element-dropdown';
import theme from '../resources/theme-schema.json';

export default function Dropdown(props: props) {
  return (
    <View style={styles.layout}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <RNDropdown
        labelField="label"
        valueField="value"
        style={styles.dropdown}
        placeholder={props.placeholder ? props.placeholder : ''}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedTextStyle}
        activeColor={theme.colors['border-alt']}
        data={props.data}
        containerStyle={styles.container}
        itemTextStyle={styles.itemText}
        value={props.value}
        onFocus={() => props.setIsFocus(true)}
        onBlur={() => props.setIsFocus(false)}
        onChange={item => {
          props.setValue(item.value);
          props.setIsFocus(false);
        }}
      />
    </View>
  );
}

interface props {
  data: {label: string; value: string}[];
  value: string;
  isFocus: boolean;
  setIsFocus: Function;
  setValue: Function;
  placeholder?: string;
  label?: string;
}

const styles = StyleSheet.create({
  layout: {
    gap: 5,
  },
  label: {
    fontFamily: "Jakarta-Medium",
    color: theme.colors.primary,
  },
  dropdown: {
    height: 50,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: theme.colors['text-primary'],
    backgroundColor: theme.colors.background,
  },
  selectedTextStyle: {
    fontSize: 18,
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-primary'],
  },
  placeholder: {
    color: theme.colors['border-alt'],
    backgroundColor: theme.colors.background,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  itemText: {
    color: theme.colors['text-primary'],
    fontFamily: 'Jakarta-Regular',
  },
});
