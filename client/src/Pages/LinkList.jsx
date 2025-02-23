import React from 'react'
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

function LinkList() {
    const [array, setArray] = useState([]);
    const [input, setInput] = useState('');
    const [sinput, setsInput] = useState('');
    const [highlightind, setHighlightind] = useState(-1);
    const [message, setMessage] = useState('');
    const [isRunning,setisRunning]=useState(false);
        const [color,setColor]=useState(-1);
    const [size,setSize]=useState(5);
        const handleSize=(e)=>{
            const newSize = parseInt(e.target.value);
            setSize(newSize);
            setMessage(`LinkList size set to ${newSize}`);
        }


    const addElement = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        if(array.length==size){
            setMessage(`Size reached :${size}`);
return;

        }

        const newArray = [...array, input];
        setArray(newArray);
        setHighlightind(newArray.length - 1);
        setMessage(`Pushed: ${input}`);
        setInput('');
        setTimeout(() => {
            setHighlightind(-1);
        }, 1000);
   
        
    }
    const highLightSearch=()=>{
        let found=false;
        let allTimers = [];
        for (let i = 0; i <= array.length; i++) {
            if (found) break; 
            function close(i) {
             const timer= setTimeout(function () {
                setHighlightind(i);
               if(array[i]==sinput){
                setMessage(`Target found at index ${i}`);
                setColor(i);
                found=true;
                allTimers.forEach(t => clearTimeout(t));
                return;
              
               }
               if(i==array.length-1&&array[i]!=target){
                setMessage('Target not found in LL');
            
               }
              }, i * 1000);
              allTimers.push(timer);
            }
            close(i); 
          
          }
    }
    const searchElement = (e) => {
        e.preventDefault();
       
        setisRunning(true);
        highLightSearch();
    };

   

    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                    <div className="mb-8">
                        
                        {array && array.length > 0 && (
                            <div className="space-y-4 flex flex-wrap justify-center">
                                <div className="flex  items-center space-x-2  space-y-reverse
                                            border-2 border-gray-200 p-2 sm:p-4 rounded-lg w-full sm:w-auto overflow-x-auto">
                                                Head<div className='flex items-center justify-center'><ArrowRight className="h-6 w-6 mx-2 text-blue-500" /></div>
                                    {array.map((value, index) => (
                                        <div key={index} className='flex  flex-nowrap'>
                                        <div
                                            key={index}
                                            className={`
                                 
                                                flex items-center justify-center rounded-full
                                             sm:w-12 h-12 sm:h-12 w-12 text-base sm:text-lg font-semibold
                                                transition-colors duration-200 border-2 border-gray-200
                                                ${color===index?'bg-green-400':highlightind === index ? 'bg-yellow-300' : 'bg-white'}
                                            `}
                                        >
                                    
                                            {value}
                                            </div>
                                            <div className='flex items-center justify-center'><ArrowRight className="h-6 w-6 mx-2 text-blue-500" /></div>
                                         
                                           
                                        </div>
                                    
                                    ))}
                                    NULL
                                </div>
                            
                            </div>
                         
                        )}
                     
                         {message && (
                                    <div className="w-full text-center mt-4 text-blue-600 text-sm sm:text-base">
                                        {message}
                                    </div>
                                )}
                    </div>

                    <form className="space-y-4 sm:space-y-6 max-w-md mx-auto">
                    <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                               Enter LinkedList Size
                            </label>
                            <select 
                                value={size}
                                onChange={handleSize}
                                disabled={isRunning}
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Enter Node element
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                disabled={isRunning}
                                placeholder="Enter single value"
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md 
                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                         text-sm sm:text-base"
                            />
                            <button
                                onClick={addElement}
                                disabled={isRunning}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-blue-700 focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                Add Node
                            </button>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Enter Search Element
                            </label>
                            <input
                                type="number"
                                onChange={(e) => setsInput(e.target.value)}
                                value={sinput}
                                disabled={isRunning}
                                placeholder="Enter single value"
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md 
                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                         text-sm sm:text-base"
                            />
                            <button
                                onClick={searchElement}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-blue-700 focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                Run 
                            </button>
                        </div>
                     
                    </form>
                </div>
            </div>
        </main>
    );
}

export default LinkList;