import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import theme from "../resources/theme-schema.json";

export default function Button(props: props) {
  return (
    <Pressable
      {...props}
      style={[styles.button, styles[props.type], props.disabled && styles.disabled]}
      android_ripple={{ color: props.disabled ? theme.colors.disabled : theme.colors.ripple }}
    >
      <Text style={[styles.title, styles[`title_${props.type}`]]}>
        {props.title}
      </Text>
    </Pressable>
  );
}

interface props extends PressableProps {
  title: string;
  type: "primary" | "outlined";
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
  },
  title: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 16,
  },
  title_primary: {
    color: "white",
  },
  title_outlined: {
    color: theme.colors.primary,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  outlined: {
    backgroundColor: "transparent",
    borderColor: theme.colors.primary,
  },
  disabled: {
    backgroundColor: theme.colors.disabled
  },
});
