import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/common.types';
import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';

export interface LocalAuth {
  accessToken: string | null;
  refreshToken: string | null;
  expireTime: number | null;
  user?: User;
}
const localAuth = localStorageUtils.getObject(KeyStorage.AUTH) as LocalAuth | null;

const initialState: LocalAuth | null = localAuth;

const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    changeAuth: (state: LocalAuth | null, action: PayloadAction<LocalAuth | null>) => {
      state = action.payload;
      return state;
    },
  },
});

const { reducer, actions } = auth;
export const { changeAuth } = actions;
export default reducer;
