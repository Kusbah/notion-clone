import { creatPage } from "./utils/createPage";
import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";

const initialState = creatPage();
function App() {
  return (
    <AppStateProvider initialState={initialState}>
      <Page />
    </AppStateProvider>
  );
}
export default App;
