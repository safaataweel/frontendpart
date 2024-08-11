// store/documentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DocumentState { 
  content: string;
  title: string;
}

const initialState: DocumentState = {
  content: '',
  title: ''
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    }
  },
});

export const { setContent, setTitle } = documentSlice.actions;
export default documentSlice.reducer;
