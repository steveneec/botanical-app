import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles as globalStyles } from "../shared/styles";
import theme from "../resources/theme-schema.json";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const CELL_COUNT = 5;

export default function AuthVerifyCode({ navigation, route }: any) {
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    sendSMS();
  },[])

  async function sendSMS(){
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+593${(route.params.phone as string).substring(1,10)}`);
      setConfirm(confirmation);
    } catch (error) {
      console.log(error)
    }
  }

  function checkCode() {
    return code.length === CELL_COUNT;
  }

  async function onContinue(){
    try {
      await confirm?.confirm(code);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.layout}>
        <Text style={styles.codeCaption}>
          Verificación de número de teléfono
        </Text>
        <Text style={styles.phoneCaption}>
          Ingresa el código de 5 dígitos que enviamos al número{" "}
          <Text style={styles.phoneNumber}>{route.params.phone}</Text>
        </Text>
        <CodeField
          {...props}
          ref={ref}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View>
          <Button title="Continuar" type="primary" disabled={!checkCode()} onPress={onContinue}/>
        </View>
        <Text style={styles.badNumber}>
          ¿<Text style={styles.phoneNumber}>{route.params.phone}</Text> no es tu
          número de teléfono?.{" "}
          <Text style={styles.editNumber}>Corregir número.</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  codeCaption: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 24,
    color: theme.colors["text-primary"],
  },
  codeFieldRoot: {
    justifyContent: "center",
    gap: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
  cell: {
    width: 42,
    height: 46,
    lineHeight: 42,
    fontSize: 32,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors["border-alt"],
    textAlign: "center",
    fontFamily: "Jakarta-Medium",
    color: theme.colors["text-primary"],
  },
  focusCell: {
    borderColor: theme.colors.primary,
  },
  phoneCaption: {
    fontFamily: "Jakarta-Regular",
    color: theme.colors["text-secondary"],
  },
  phoneNumber: {
    color: theme.colors.primary,
    fontFamily: "Jakarta-SemiBold",
  },
  badNumber: {
    marginTop: 10,
    textAlign: "center",
    color: theme.colors["text-secondary"],
  },
  editNumber: {
    fontFamily: "Jakarta-SemiBold",
    color: theme.colors.primary,
  },
});
