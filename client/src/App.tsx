import './App.css'
import { Router } from './Router'
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <HashRouter>
        <Router />
      </HashRouter>
    </>
  )
}

export default App
