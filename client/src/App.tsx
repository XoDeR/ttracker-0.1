import './App.css'
import { Router } from './Router'
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Router />
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
