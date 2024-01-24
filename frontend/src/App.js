import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Upload from './components/Upload';
import Show from "./components/Show"
import Delete from './components/Delete';
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/upload" element={<Upload/>}/>
    <Route path="/show" element={<Show/>}/>
    <Route path="/delete" element={<Delete/>}/>

  </Routes>
  </BrowserRouter>
  );
}

export default App;
