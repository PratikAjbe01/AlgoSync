

import './App.css'
import Navbar from './Components/Navbar'
import LinearSearch from './Pages/LinearSearch'
import BinarySearch from './Pages/BinarySearch'
import { Routes, Route } from "react-router-dom"
import KadaneAlgo from './Pages/KadaneAlgo'
import TwoPointer from './Pages/TwoPointer'

function App() {


  return (
    <div className='app'>
 <Navbar/>
<Routes>
 
  <Route path='/Linearsearch' element={<LinearSearch/>}/>
  <Route path='/Binarysearch' element={<BinarySearch/>}/>
  <Route path='/KadaneAlgo' element={<KadaneAlgo/>}/>
  <Route path='/TwoPointer' element={<TwoPointer/>}/>
</Routes>

    </div>
  )
}

export default App
