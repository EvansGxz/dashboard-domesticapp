
import UnAuthenticated from "./Auth/UnAuthenticated";
import Authenticated from "./Auth/Authenticated";
import { useAuth } from "./context/auth-context";

function App() {
  const { user } = useAuth();
  return user ? <Authenticated /> : <UnAuthenticated />;
}

export default App;