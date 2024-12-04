import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import OrderForm from "./components/OrderForm";
import Confirmation from "./components/Confirmation";
import reactLogo from './assets/react.svg';
import workintech from '/workintech.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        
        <div>
          <a href="https://github.com/Workintech/fsweb-s7-challenge-pizza" target="_blank" rel="noopener noreferrer">
            <img src={workintech} className="logo" alt="Workintech logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
