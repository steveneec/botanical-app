import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles as globalStyles } from "../shared/styles";
import Input from "../components/Input";
import Button from "../components/Button";
import { Phone } from "phosphor-react-native";

export default function CompleteProfile() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={globalStyles.scrollLayout}>
        <Text style={globalStyles.screenTitle}>Completa tu perfil</Text>
        <Text style={globalStyles.screenDescription}>
          Ya casi estamos listos, necesitamos algo de información extra para
          continuar.
        </Text>
        <View style={styles.form}>
          <Input label="Nombre" icon={<Phone/>} />
          <Input label="Apellido" />
          <Input label="Ciudad" helpText="Selecciona tu ciudad"/>
        </View>
        <View>
          <Button title="Continuar" type="primary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 20,
        gap: 10
    }
});
