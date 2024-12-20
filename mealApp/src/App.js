import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import InputMeals from './Components/InputMeals';
import DisplayMeals from './Components/DisplayMeals';
import DisplayScedule from './Components/DisplaySchedule';
import SelectSchedule from './Components/SelectSchedule';
import DisplayIngredients from './Components/DisplayIngredients';



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
          <Route path="/DisplayMeals/:Time" element={<DisplayMeals/>}/>
          <Route path="/DisplayScedule" element={<DisplayScedule/>}/>
          <Route path="/DisplayScedule/:ScheduleId" element={<DisplayScedule/>}/>
          <Route path="/SelectSchedule" element={<SelectSchedule/>}/>
          <Route path="/DisplayIngredients" element={<DisplayIngredients/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
