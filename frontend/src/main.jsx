
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import App from "./App.jsx";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import { BrowserRouter } from "react-router-dom";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ScrollTop /> {/* ✅ ScrollTop inside Router */}
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  // </StrictMode>
);
