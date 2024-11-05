import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CardPage from './Pages/CardPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<CardPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
