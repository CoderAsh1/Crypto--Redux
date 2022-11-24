import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Coins, Home, Navbar, Marquee, News, CoinDetails } from "./components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Switch } from "@mui/material";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="mode">
          <Switch onClick={() => setMode(mode === "dark" ? "light" : "dark")} />
        </div>
        <Marquee />
        <div className="nav">
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/coins" element={<Coins />} />
          <Route exact path="/coins/:id" element={<CoinDetails />} />
          <Route exact path="/news" element={<News />} />
        </Routes>
        <div className="footer"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;
