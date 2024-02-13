import { StyleSheet } from "react-native";
import theme from "../../resources/theme-schema.json";


export const styles = StyleSheet.create({
    layout: {
        padding: 20,
    },
    scrollLayout: {
        padding: 20
    },
    textAccent: {
        fontFamily: 'Jakarta-Regular',
        color: theme.colors.primary
    },
    screenTitle: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 24,
        color: theme.colors["text-primary"]
    },
    screenDescription: {
        fontFamily: "Jakarta-Regular",
        color: theme.colors["text-secondary"]
    }
})