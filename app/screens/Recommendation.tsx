import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';

export default function Recommendation() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.layout}>
          <Text style={globalStyles.screenTitle}>Recomendación</Text>
          <Text style={globalStyles.screenDescription}>
            Contesta las preguntas y la <Text style={globalStyles.textAccent}>IA</Text> te dará una{' '}
            <Text style={globalStyles.textAccent}>recomendación personalizada para tí 😎</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
})
