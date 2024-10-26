import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./index.css";
import App from "./App";
import store from "./store/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const queryClient = new QueryClient();
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          {/* TODO: github page 일때만 hash router, s3에 배포할땐 browser router로 바꾸기 */}
          <HashRouter basename="/">
            <App />
          </HashRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

serviceWorkerRegistration.register();
