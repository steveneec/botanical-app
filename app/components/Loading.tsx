import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from '../resources/theme-schema.json';

export default function Loading(props: props){
    return <SafeAreaView style={[styles.layout, props.fullscreen ? styles.layoutFS : {}]}>
        <Image source={require("../resources/images/loading.gif")} style={styles.image}/>
        {props.caption && <Text style={styles.caption}>{props.caption}</Text>}
    </SafeAreaView>
}

interface props {
    caption?: string;
    fullscreen?: boolean;
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: theme.colors.background
    },
    layoutFS: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999
    },
    image: {
        width: 100,
        height: 100
    },
    caption: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18,
        color: theme.colors.primary
    }
})