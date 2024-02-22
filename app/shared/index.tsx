import {BaseToast, ErrorToast} from 'react-native-toast-message';
import theme from '../../app/resources/theme-schema.json';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#4caf50',
        width: '96%',
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 16,
        fontFamily: 'Jakarta-SemiBold',
        color: theme.colors['text-primary'],
      }}
      text2Style={{
        fontSize: 18,
        fontFamily: 'Jakarta-Regular',
        color: theme.colors['text-secondary'],
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
    {...props}
    style={{
      borderLeftColor: '#f44336',
      width: '96%',
      backgroundColor: theme.colors.background,
    }}
    contentContainerStyle={{paddingHorizontal: 15}}
    text1Style={{
      fontSize: 16,
      fontFamily: 'Jakarta-SemiBold',
      color: theme.colors['text-primary'],
    }}
    text2Style={{
      fontSize: 18,
      fontFamily: 'Jakarta-Regular',
      color: theme.colors['text-secondary'],
    }}
    />
  ),
};

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));