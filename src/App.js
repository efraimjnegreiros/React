import './App.css';
import Create from './components/Create';
import Read from './components/read';
import Update from './components/update';
import Updateg from './components/updateg';
import Createg from './components/CreateG';
import Readg from './components/Readg'
import A from './components/a'

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
          <Route path='/createg' element={<Createg />} />
          <Route path='/readg' element={<Readg />} />
          <Route path='/updateg/:id' element={<Updateg />} />
          <Route path='/a' element={<A />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
