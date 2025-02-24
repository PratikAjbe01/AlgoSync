

import './App.css'
import Navbar from './Components/Navbar'
import LinearSearch from './Pages/LinearSearch'
import BinarySearch from './Pages/BinarySearch'
import { Routes, Route } from "react-router-dom"
import KadaneAlgo from './Pages/KadaneAlgo'
import TwoPointer from './Pages/TwoPointer'
import Stack from './Pages/Stack'
import Queue from './Pages/Queue'
import Dequeue from './Pages/Dequeue'
import LinkList from './Pages/LinkList'
import SlidingWindow from './Pages/SlidingWindow'
import Home from './Pages/Home'

function App() {


  return (
    <div className='app'>
 <Navbar/>
<Routes>
 
  <Route path='/Linearsearch' element={<LinearSearch/>}/>
  <Route path='/Binarysearch' element={<BinarySearch/>}/>
  <Route path='/KadaneAlgo' element={<KadaneAlgo/>}/>
  <Route path='/TwoPointer' element={<TwoPointer/>}/>
  <Route path='/Stack' element={<Stack/>}/>
  <Route path='/Queue' element={<Queue/>}/>
  <Route path='/dQueue' element={<Dequeue/>}/>
  <Route path='/LinkList' element={<LinkList/>}/>
  <Route path='/SlidingWindow' element={<SlidingWindow/>}/>
  <Route path='/' element={<Home/>}/>
</Routes>

    </div>
  )
}

export default App
