import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router } from 'react-router-dom'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Books from './components/Books/Books';
import Students from './components/Students/Students';
import AddAssignBook from './components/AssignBook/AddAssignBook';
import GetAssignBook from './components/AssignBook/GetAssignBook';

function App() {
  return (
    <div className="App">
        <Router>
           <Navbar/>
           <Routes>
              <Route  path="/books" exact element={<Books/>}/>
              <Route  path="/students" exact element={<Students/>}/>
              <Route  path="/assignbook" exact element={<GetAssignBook/>}/>

           </Routes>
        </Router>
    </div>
  );
}

export default App;
