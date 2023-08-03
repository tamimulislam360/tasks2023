import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'All',
  search: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setStatus, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
