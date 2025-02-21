import React, { useState } from 'react'

function LinearSearch() {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [runData, setRunData] = useState(false);
    const [isRunning,setisRunning]=useState(false);
    const [color,setColor]=useState(-1);
    const [message, setMessage] = useState('');
    const highLightSearch=()=>{
        let found=false;
        let allTimers = [];
        for (let i = 0; i <= array.length; i++) {
            if (found) break; 
            function close(i) {
             const timer= setTimeout(function () {
               setColor(i);
               if(array[i]==target){
                setMessage(`Target found at index ${i}`);
                setColor(i);
                found=true;
                allTimers.forEach(t => clearTimeout(t));
                return;
              
               }
               if(i==array.length-1&&array[i]!=target){
                setMessage('Target not found in array');
            
               }
              }, i * 1000);
              allTimers.push(timer);
            }
            close(i); 
          
          }
    }
    const handleArrayChange = (e) => {
        const value = e.target.value;
 
        const inputArray = value.split(',').map(item => item.trim()).filter(item => item !== '');
        setArray(inputArray);
    };
    const handleRun = (e) => {
        e.preventDefault();
        setRunData(true);
        setisRunning(true);
        highLightSearch();
    };

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="algoview">
        {runData && array && array.length > 0 && (
                    <div className="array-elements">
                        {array.map((value, index) => (
 <div className="box" key={index} style={{ border: '1px solid black', background: message === `Target found at index ${index}` 
 ? 'rgb(54, 247, 125)' // green-500
 : color === index 
 ? 'rgb(238, 238, 9)' // yellow-500
 : 'white' , padding: '10px', margin: '5px' }}>
                                {value}
                            </div>
                        ))}
                       {message}
                    </div>
                )}
        </div>
        <div className="inputdata">
            <form action="">
                <label>Enter Array Elements</label>
                <input  type="text" 
                        onChange={handleArrayChange} 
                        disabled={isRunning} 
                        placeholder="e.g., 1, 2, 3, 4"/>
                <label>Enter Target Value</label>
                <input   type="number" 
                 disabled={isRunning} 
                        onChange={(e) => setTarget(e.target.value)} />
                <button disabled={isRunning} onClick={handleRun}>Run</button>
            </form>
        </div>

    </main>
  )
}

export default LinearSearch
