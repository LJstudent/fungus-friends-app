import { createSlice } from '@reduxjs/toolkit';
import { mushrooms } from '../../components/data/mushrooms/mushrooms';
import { IMushroom } from '../../components/models/interfaces/IMushroom';

export interface IMushroomState {
  mushroom: IMushroom[];
  newRecord: boolean;
}

const initialState: IMushroomState = {
  mushroom: mushrooms,
  newRecord: false
}

export const mushroomSlice = createSlice({
  name: 'mushroom',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const {} = mushroomSlice.actions

export default mushroomSlice.reducer