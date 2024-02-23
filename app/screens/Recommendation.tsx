import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import questions from '../resources/questions.json';
import Dropdown from '../components/Dropdown';
import {useState} from 'react';
import Button from '../components/Button';
import {getRecomendation} from '../libs/services';
import Loading from '../components/Loading';

export default function Recommendation({navigation}: any) {
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [answer5, setAnswer5] = useState('');
  const [answer6, setAnswer6] = useState('');
  const [isfocus1, setIsFocus1] = useState(false);
  const [isfocus2, setIsFocus2] = useState(false);
  const [isfocus3, setIsFocus3] = useState(false);
  const [isfocus4, setIsFocus4] = useState(false);
  const [isfocus5, setIsFocus5] = useState(false);
  const [isfocus6, setIsFocus6] = useState(false);
  const [loading, setLoading] = useState(false);

  function checkForm() {
    return (
      answer1 === '' ||
      answer2 === '' ||
      answer3 === '' ||
      answer4 === '' ||
      answer5 === '' ||
      answer6 === ''
    );
  }

  function onContinue() {
    setLoading(true);
    let prompt = '';
    const values = [answer1, answer2, answer3, answer4, answer5, answer6];
    questions.map((qst, key) => {
      prompt = `${prompt} ${qst.question} - ${values[key]}`;
    });

    getRecomendation({prompt:prompt})
      .then(data => {
        console.log(data);
        navigation.reset({
          index: 1,
          routes: [
            {name: 'Home'},
            {name: 'RecommendationResult', params: {recommendation: data}},
          ],
        });
      })
      .catch(error => console.log(error.response));
  }

  if (loading)
    return (
      <Loading caption="Estamos cargando tu recomendación  😎🌱🤖" fullscreen />
    );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={globalStyles.layout}>
            <Text style={globalStyles.screenTitle}>Recomendación</Text>
            <Text style={globalStyles.screenDescription}>
              Contesta las preguntas y la{' '}
              <Text style={globalStyles.textAccent}>IA</Text> te dará una{' '}
              <Text style={globalStyles.textAccent}>
                recomendación personalizada para tí 😎
              </Text>
            </Text>
          </View>
          <View style={styles.answers}>
            <Dropdown
              data={questions[0].answers}
              label={questions[0].question}
              value={answer1}
              setValue={setAnswer1}
              isFocus={isfocus1}
              setIsFocus={setIsFocus1}
            />
            <Dropdown
              data={questions[1].answers}
              label={questions[1].question}
              value={answer2}
              setValue={setAnswer2}
              isFocus={isfocus2}
              setIsFocus={setIsFocus2}
            />
            <Dropdown
              data={questions[2].answers}
              label={questions[2].question}
              value={answer3}
              setValue={setAnswer3}
              isFocus={isfocus3}
              setIsFocus={setIsFocus3}
            />
            <Dropdown
              data={questions[3].answers}
              label={questions[3].question}
              value={answer4}
              setValue={setAnswer4}
              isFocus={isfocus4}
              setIsFocus={setIsFocus4}
            />
            <Dropdown
              data={questions[4].answers}
              label={questions[4].question}
              value={answer5}
              setValue={setAnswer5}
              isFocus={isfocus5}
              setIsFocus={setIsFocus5}
            />
            <Dropdown
              data={questions[5].answers}
              label={questions[5].question}
              value={answer6}
              setValue={setAnswer6}
              isFocus={isfocus6}
              setIsFocus={setIsFocus6}
            />
            <Button
              title="Obtener Recomendación"
              type="primary"
              disabled={checkForm()}
              onPress={onContinue}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  answers: {
    gap: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
