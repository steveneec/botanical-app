import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as globalStyles} from '../shared/styles';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectToken, selectUser} from '../store/features/authSlice';
import {getHistory} from '../libs/services';
import {billType} from '../types';
import {Calendar, IconContext, Plant, Star} from 'phosphor-react-native';
import Loading from '../components/Loading';
import theme from '../resources/theme-schema.json';
import plans from '../resources/plans-info.json';
import { delay } from '../shared';

export default function Bills() {
  const [bills, setBills] = useState<billType[]>([]);
  const [ready, setReady] = useState(false);

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    await delay(1000);
    getHistory(user.id, token)
      .then(data => {
        setBills(data);
        setReady(true);
      })
      .catch(error => console.log(error));
  }

  if (!ready) return <Loading fullscreen />;

  return (
    <SafeAreaView>
      <ScrollView>
        {bills.map((bill, key) => (
          <View style={styles.historyRow} key={key}>
            <View style={styles.rowContent}>
              <IconContext.Provider
                value={{size: 24, color: theme.colors.primary}}>
                {bill.tipo_compra === 'plan' ? <Star /> : <Plant />}
              </IconContext.Provider>
              <View style={{gap: 5}}>
                <Text style={styles.billObjectName}>
                  {bill.tipo_compra === 'plan'
                    ? plans[(bill.plansId as number) - 1].name
                    : bill.plants?.nombre}
                </Text>
                <View style={styles.info}>
                  <Calendar size={16} />
                  <Text style={styles.text}>
                    {new Date(bill.f_compra).toDateString()}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.price}>${bill.total}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  historyRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: "space-between"
  },
  chip: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: 'white',
    borderRadius: 20,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    fontFamily: 'Jakarta-Regular',
    color: theme.colors['text-primary'],
    fontSize: 16,
  },
  billObjectName: {
    fontFamily: 'Jakarta-SemiBold',
    color: theme.colors['text-primary'],
    fontSize: 18,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  price: {
    fontFamily: 'Jakarta-SemiBold',
    color: theme.colors['text-primary'],
    fontSize: 22,
  }
});
