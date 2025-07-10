import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import "/src/styles/ag-custom.css";
import { useCustomDialogProvider } from "./components/CustomDialog";

function App() {
  const dialogProvider = useCustomDialogProvider();
  return (
    <BrowserRouter>
      <AppRoutes />
      {dialogProvider}
    </BrowserRouter>
  );
}
export default App;
