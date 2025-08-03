import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const graphSlice = createSlice({
  name: "graphSlice",
  initialState: {
    lineLayerRoutes: [],
    lineLayerAirports: [],
  },
  reducers: {
    setLineLayerRoutes: (state, action: PayloadAction<any>) => {
      state.lineLayerRoutes = action.payload;
    },
    setLineLayerAirports: (state, action: PayloadAction<any>) => {
      state.lineLayerAirports = action.payload;
    },
  },
});

export const { setLineLayerAirports, setLineLayerRoutes } = graphSlice.actions;
export default graphSlice.reducer;
