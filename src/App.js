import './App.css';
import Create from './components/Create';
import Read from './components/read';
import Update from './components/update';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">React Crud Operations</h2>
        <Routes>
          <Route path='/create' element={<Create />} />
          <Route path='/read' element={<Read />} />
          {/* Rota para Update com id na URL */}
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
