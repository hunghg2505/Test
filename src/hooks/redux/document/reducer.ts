import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import merge from 'lodash/merge';
interface DocumentState {
  title?: string;
  isNotFound?: boolean;
}

const initialState = {
  title: process.env.REACT_APP_NAME || 'ABD-PDPA',
  isNotFound: false,
};

const document = createSlice({
  name: 'document',
  initialState: initialState,
  reducers: {
    changeDocument: (state: DocumentState, action: PayloadAction<DocumentState>) => {
      state = merge(state, action.payload);
    },
  },
});

const { reducer, actions } = document;
export const { changeDocument } = actions;
export default reducer;
