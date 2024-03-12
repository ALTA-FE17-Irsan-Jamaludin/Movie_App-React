import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    onTouch: (state) => {
      state.value = !state.value;
    },
  },
});

export const { onTouch } = modeSlice.actions;
export default modeSlice.reducer;
