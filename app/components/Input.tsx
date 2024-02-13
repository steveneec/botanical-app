import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { IconContext } from "phosphor-react-native";
import { ReactElement } from "react";
import theme from "../resources/theme-schema.json";

export default function Input(props: props) {
  return (
    <View style={styles.layout}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View
        style={[
          styles.inputContainer,
          props.icon && styles.inputContainerWithIcon,
        ]}
      >
        {props.icon && (
          <IconContext.Provider
            value={{
              color: theme.colors.border,
              size: 18,
              weight: "regular",
            }}
          >
            {props.icon}
          </IconContext.Provider>
        )}
        <TextInput
          {...props}
          style={[styles.input, props.icon && styles.inputWithIcon]}
          placeholderTextColor={theme.colors.border}
        />
      </View>
      {props.helpText && <Text style={styles.helpText}>{props.helpText}</Text>}
    </View>
  );
}

interface props extends TextInputProps {
  icon?: ReactElement;
  label?: string;
  helpText?: string;
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: "column",
    gap: 3,
    flexGrow: 1
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.border,
    alignItems: "center",
    paddingVertical: 2,
  },
  inputContainerWithIcon: {
    paddingLeft: 10,
  },
  input: {
    paddingHorizontal: 10,
    fontFamily: "Jakarta-Regular",
    marginVertical: 5,
    fontSize: 18,
    paddingVertical: 0,
    color: theme.colors["text-primary"],
    flex: 1
  },
  inputWithIcon: {
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
    marginLeft: 10,
    paddingLeft: 10,
  },
  label: {
    fontFamily: "Jakarta-Medium",
    color: theme.colors.primary,
  },
  helpText: {
    fontFamily: "Jakarta-Regular",
    color: theme.colors["text-secondary"],
  },
});
