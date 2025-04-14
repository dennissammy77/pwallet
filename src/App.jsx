import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Header from './components/Header';


function App() {
  return (
    <div className="p-4">
      <Header />
      <Routes>
        <Route path="/" element={<Transactions />} />
        {/* <Route path="/transactions" element={<Transactions />} /> */}
      </Routes>
    </div>
  )
}

export default App