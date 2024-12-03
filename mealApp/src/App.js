import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import InputMeals from './Components/InputMeals';
import DisplayMeals from './Components/DisplayMeals';
import DisplaySCedule from './Components/DisplaySchedule';
import SelectSchedule from './Components/SelectSchedule';


function App() {
  
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Home" element = {<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/InputMeal" element={<InputMeals/>}/>
          <Route path="/DisplayMeals" element={<DisplayMeals/>}/>
          <Route path="/DisplayScedule" element={<DisplaySCedule/>}/>
          <Route path="/SelectSchedule" element={<SelectSchedule/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
