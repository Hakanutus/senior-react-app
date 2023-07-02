import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Form from "./scenes/Form";
import Calendar from "./scenes/calendar";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Reports from "./scenes/reports";
import Line from "./scenes/line";




/* import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Geography from "./scenes/geography";
 */





function App() {
  const [theme, colorMode] = useMode();
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme} >
     <CssBaseline />
     <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/line" element={<Line />} />





          {/* <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/form" element={<Form />} />
           />
  */}




        </Routes>
      </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
