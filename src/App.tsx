import './App.css';
import Routes from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}><Routes /></QueryClientProvider>;
}

export default App;
