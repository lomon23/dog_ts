import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import DogList from './components/DogList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/dogs' element={<DogList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzU2ZDk1MTgxODg1NWVlZDdmZDlmNTgiLCJ1c2VybmFtZSI6ImxvbW9uIiwiaWF0IjoxNzMzNzQ0OTc3LCJleHAiOjE3MzM4MzEzNzd9.VvaStHxKdU-hrOvLITBskPkxzna1MMhrEprWsPXc-6A"
// }