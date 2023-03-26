import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Home from './components/Home';
import AddUser from './components/AddUser'
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/add-user" element={<AddUser />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
