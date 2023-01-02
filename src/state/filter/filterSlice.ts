import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Spots } from '../../components/models/enums/Spots'
import { Color } from '../../components/models/enums/Color'

export interface filterState {
  valueSpots: Spots;
  valueColor: Color;
}

const initialState: filterState = {
  valueSpots: -1,
  valueColor: -1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearFilters: (state) => {
      state.valueSpots = -1
      state.valueColor = -1
    },
    searchFilterSpots: (state, action: PayloadAction<Spots>) => {
      state.valueSpots = action.payload
    },
    searchFilterColor: (state, action: PayloadAction<Color>) => {
        state.valueColor = action.payload
      },

  },
});

// Action creators are generated for each case reducer function
export const { clearFilters, searchFilterSpots, searchFilterColor } = filterSlice.actions;

export default filterSlice.reducer