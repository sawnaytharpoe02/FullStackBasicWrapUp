import ReactDOM from "react-dom/client";
import ThemeProvider from "./theme/index.tsx";
import AppRouter from "./components/AppRouter.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ThemeProvider>
);
