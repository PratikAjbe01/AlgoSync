import React from 'react'
import { useState } from 'react';

function Queue() {
    const [array, setArray] = useState(new Array(5).fill(undefined));
    const [input, setInput] = useState('');
    const [highlightind, setHighlightind] = useState(-1);
    const [message, setMessage] = useState('');
     const [size, setSize] = useState(5);
        const [front, setFront] = useState(-1);
        const [rear, setRear] = useState(-1);
        const handleSize = (e) => {
            const newSize = parseInt(e.target.value);
            setSize(newSize);
            setArray([]); 
            setFront(-1);
            setRear(-1);
            setMessage(`Queue size set to ${newSize}`);
        };
    
        const isFull = () => {
            return rear === size - 1;
        };
    
        const isEmpty = () => {
            return front === -1; 
        };
    
        const addElement = (e) => {
            e.preventDefault();
            if (!input.trim()) return;
    
            if (isFull()) {
                setMessage(`Queue is full`);
                return;
            }
    
            if (isEmpty()) {
                setFront(0);
                setRear(0);
                setArray([input]); 
            } else {
                setRear(rear + 1);
                setArray([...array, input]); 
            }
    
            setHighlightind(rear + 1);
            setMessage(`Enqueued: ${input}`);
            setInput('');
    
            setTimeout(() => {
                setHighlightind(-1);
            }, 1000);
        };
    
        const removeElement = (e) => {
            e.preventDefault();
            if (isEmpty()) {
                setMessage('Queue is empty!');
                return;
            }
    
            setHighlightind(0);
            const elementToRemove = array[0];
    
            setTimeout(() => {
                if (front === rear) {
            
                    setArray([]);
                    setFront(-1);
                    setRear(-1);
                } else {
                    setFront(front + 1);
                    setArray(array.slice(1)); 
                }
    
                setMessage(`Dequeued: ${elementToRemove}`);
                setHighlightind(-1);
            }, 500);
        };
       

    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                    <div className="mb-8">
                        {array && array.length > 0 && (
                            <div className="space-y-4 flex flex-wrap justify-center">
                                <div className="flex  items-center  space-y-reverse 
                                            border-2 border-gray-200 p-2 sm:p-4 rounded-lg w-full sm:w-auto">
                                    {array.map((value, index) => (
                                        <div
                                            key={index}
                                            className={`
                                 
                                                flex items-center justify-center
                                             sm:w-12 h-12 sm:h-12 w-12 text-base sm:text-lg font-semibold
                                                transition-colors duration-200 border-2 border-gray-200
                                                ${highlightind === index ? 'bg-yellow-300' : 'bg-white'}
                                            `}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            
                            </div>
                         
                        )}
                            <div className="w-full text-center mt-2 text-sm text-gray-600">
                             Front: {front}, Rear: {rear}
                         </div>
                         {message && (
                                    <div className="w-full text-center mt-4 text-blue-600 text-sm sm:text-base">
                                        {message}
                                    </div>
                                )}
                    </div>

                    <form className="space-y-4 sm:space-y-6 max-w-md mx-auto">
                    <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Select Queue Size
                            </label>
                            <select 
                                value={size}
                                onChange={handleSize}
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Enter Queue element
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                placeholder="Enter single value"
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md 
                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                         text-sm sm:text-base"
                            />
                            <button
                                onClick={addElement}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-blue-700 focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                Enqueue
                            </button>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={removeElement}
                                className="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-red-700 focus:outline-none focus:ring-2 
                                         focus:ring-red-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                Dequeue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Queue;