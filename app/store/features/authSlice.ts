import {createSlice} from '@reduxjs/toolkit';
import {usuarioType} from '../../types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface initialStateInterface {
  signed: boolean;
  user: usuarioType | null;
  token: string | null;
  rnUser: FirebaseAuthTypes.User | null;
}

const initialState: initialStateInterface = {
  signed: false,
  user: null,
  token: null,
  rnUser: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSigned: (state, action) => {
      state.signed = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRNUser: (state, action) => {
      state.rnUser = action.payload
    }
  },
});

export const {setSigned, setUser, setToken, setRNUser} = authSlice.actions;
export const selectSigned = (state: any) => state.auth.signed;
export const selectUser = (state: any) => state.auth.user;
export const selectToken = (state: any) => state.auth.token;
export const selectRNUser = (state: any) => state.auth.rnUser;
export default authSlice.reducer;
