"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </PersistGate>
  </Provider>;
}
