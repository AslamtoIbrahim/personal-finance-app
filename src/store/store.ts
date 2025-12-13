import reducer from "@/features/dashboard/lib/financer/financeSlicer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    finance: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
