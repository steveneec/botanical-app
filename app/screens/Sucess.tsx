import {Dimensions, Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../resources/theme-schema.json';

export default function Success({navigation, route}: any) {
  const {caption} = route.params;

  return <SafeAreaView style={styles.layout}>
    <Image style={styles.image} source={require("../resources/images/success.png")}/>
    {caption && <Text style={styles.caption}>{caption}</Text>}
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  layout: {
    ...StyleSheet.absoluteFillObject,
    padding: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5
  },
  caption: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 18,
    color: theme.colors.primary
  }
});
