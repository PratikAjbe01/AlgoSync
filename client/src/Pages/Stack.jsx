import React from 'react'
import { useState } from 'react';

function Stack() {
    const [array, setArray] = useState([]);
    const [input, setInput] = useState('');
    const [highlightind, setHighlightind] = useState(-1);
    const [message, setMessage] = useState('');

    const addElement = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newArray = [...array, input];
        setArray(newArray);
        setHighlightind(newArray.length - 1);
        setMessage(`Pushed: ${input}`);
        setInput('');
        setTimeout(() => {
            setHighlightind(-1);
        }, 1000);
    }

    const removeElement = (e) => {
        e.preventDefault();
        if (array.length === 0) {
            setMessage('Stack is empty!');
            return;
        }
        setHighlightind(array.length - 1);
        const elementToRemove = array[array.length - 1];
        setTimeout(() => {
            const newarray = [...array];
            newarray.pop();
            setArray(newarray);
            setMessage(`Popped: ${elementToRemove}`);
            setHighlightind(-1);
        }, 500);
    }

    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                    <div className="mb-8">
                        {array && array.length > 0 && (
                            <div className="space-y-4 flex flex-wrap justify-center">
                                <div className="flex flex-col-reverse items-center  space-y-reverse 
                                            border-2 border-gray-200 p-2 sm:p-4 rounded-lg w-full sm:w-auto">
                                    {array.map((value, index) => (
                                        <div
                                            key={index}
                                            className={`
                                                flex items-center justify-center
                                                w-full sm:w-32 h-5 sm:h-5 text-base sm:text-lg font-semibold
                                                transition-colors duration-200 border-2 border-gray-200
                                                ${highlightind === index ? 'bg-yellow-300' : 'bg-white'}
                                            `}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                                {message && (
                                    <div className="w-full text-center mt-4 text-blue-600 text-sm sm:text-base">
                                        {message}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <form className="space-y-4 sm:space-y-6 max-w-md mx-auto">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Enter stack element
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
                                PUSH
                            </button>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={removeElement}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-blue-700 focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                POP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Stack;