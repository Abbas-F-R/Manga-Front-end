'use client';

import { Provider } from "react-redux";
import store from "./Store";
import type { ReactNode } from "react"; // استيراد ReactNode

interface ProvidersProps {
  children: ReactNode; // تحديد نوع children
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {/* <ApiProvider api={CaptersApi}> */}
      {children}
      {/* </ApiProvider> */}
    </Provider>
  );
}
