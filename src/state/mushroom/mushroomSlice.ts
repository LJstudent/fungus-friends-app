import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mushrooms } from '../../components/data/mushrooms/mushrooms';
import { IMushroom } from '../../components/models/interfaces/IMushroom';

export interface IMushroomState {
  mushroom: IMushroom[];
  newRecord: boolean;
};

const initialState: IMushroomState = {
  mushroom: mushrooms,
  newRecord: false,
};

export const mushroomSlice = createSlice({
  name: 'mushroom',
  initialState,
  reducers: {
    addMushroom: (state, action: PayloadAction<IMushroom>) => {
      state.mushroom.push(action.payload)
      state.newRecord = false
    },
    deleteMushroom: (state, action: PayloadAction<number>) => {
      const index = state.mushroom.findIndex(mushroom => mushroom.id === action.payload)
      state.mushroom.splice(index, 1);
    },
    newRecord: (state) => {
      state.newRecord = true;
    },
    cancelRecord: (state) => {
      state.newRecord = false;
    }
  },
});


export const { addMushroom, newRecord, cancelRecord, deleteMushroom } = mushroomSlice.actions;

export default mushroomSlice.reducer;