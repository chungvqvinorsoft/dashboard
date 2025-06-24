import { Fragment } from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import { routers } from "./router";
import GlobalStyles from "./components/GlobalStyles";
import LayoutPage from "./layout";

function App() {
  return (
    <ConfigProvider>
      <GlobalStyles>
        <Routes>
          {routers.map((route, index) => {
            const DefaultLayout = route.layout ? LayoutPage : Fragment;
            const Page = route.page;
            return (
              <Route
                key={index}
                path={route.to}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
          })}
        </Routes>
      </GlobalStyles>
    </ConfigProvider>
  );
}

export default App;
