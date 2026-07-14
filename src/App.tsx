import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Layout } from "./components/Layout";
import { Owners } from "./pages/Owners";
import { OwnerDetails } from "./pages/OwnerDetails";
import { OwnerCars } from "./pages/OwnerCars";
import { Cars } from "./pages/Cars";
import { CarDetails } from "./pages/CarDetails";
import { About } from "./pages/About";
import { ROUTE_PATHS } from "./constants/routes";
import { GlobalStyle } from "./theme/GlobalStyles";
import { Dashboard } from "./pages/Dashboard";
import {
  darkTheme,
  lightTheme,
  type ThemeMode,
} from "./theme/theme";

function App() {
  const [themeMode, setThemeMode] =
    useState<ThemeMode>("light");
  const selectedTheme =
    themeMode === "dark" ? darkTheme : lightTheme;
  const toggleTheme = () => {
    setThemeMode((currentThemeMode) =>
      currentThemeMode === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <Layout
        themeMode={themeMode}
        onThemeToggle={toggleTheme}
      >
        <Routes>
          <Route
  path={ROUTE_PATHS.DASHBOARD}
  element={<Dashboard />}
/>
          <Route path={ROUTE_PATHS.OWNERS} element={<Owners />} />
          <Route
            path={ROUTE_PATHS.ADD_OWNER}
            element={<OwnerDetails />}
          />
          <Route
            path={ROUTE_PATHS.OWNER_CARS}
            element={<OwnerCars />}
          />
          <Route path={ROUTE_PATHS.CARS} element={<Cars />} />
          <Route
            path={ROUTE_PATHS.ADD_CAR}
            element={<CarDetails />}
          />
          <Route
            path={ROUTE_PATHS.VIEW_CAR}
            element={<CarDetails />}
          />
          <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
