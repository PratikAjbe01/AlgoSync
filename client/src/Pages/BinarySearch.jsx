import React, { useState, useEffect } from 'react';

function BinarySearch() {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [highlightedIndices, setHighlightedIndices] = useState([]);
    const [message, setMessage] = useState('');

    const binarySearch = async () => {
        setIsRunning(true);
        setHighlightedIndices([]);
        setMessage('');

        const sortedArray = [...array].sort((a, b) => a - b);
        if (JSON.stringify(array) !== JSON.stringify(sortedArray)) {
            setMessage("Array was not sorted, but I've sorted it for the search.");
        }
        setArray(sortedArray);

        let low = 0;
        let high = sortedArray.length - 1;

        while (low <= high) {
            let mid = Math.floor(low + (high - low) / 2);

            setHighlightedIndices([mid]);

            await new Promise(resolve => setTimeout(resolve, 500));

            if (parseInt(sortedArray[mid]) === parseInt(target)) {
                setMessage(`Target found at index ${mid}`);
                setHighlightedIndices([mid]);
                setIsRunning(false);
                return;
            } else if (parseInt(sortedArray[mid]) < parseInt(target)) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        setMessage('Target not found in array');
        setIsRunning(false);
    };

    const handleArrayChange = (e) => {
        const value = e.target.value;
        const inputArray = value.split(',').map(item => item.trim()).filter(item => item !== '');
        setArray(inputArray);
    };

    const handleRun = (e) => {
        e.preventDefault();
        if (!array.length || target === null || isNaN(target)) {
            setMessage('Please enter a valid array and a numeric target value');
            return;
        }

        binarySearch();
    };

    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-8">
                        {array && array.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {array.map((value, index) => (
                                        <div
                                            key={index}
                                            className={`
                                                flex items-center justify-center
                                                w-12 h-12 text-lg font-semibold rounded-md
                                                transition-colors duration-200
                                                ${message === `Target found at index ${index}` 
                                                    ? 'bg-green-500 text-white'
                                                    : highlightedIndices.includes(index)  
                                                        ? 'bg-yellow-400 text-gray-800'
                                                        : 'bg-white border-2 border-gray-300'
                                                }
                                            `}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center text-lg font-medium text-gray-700">
                                    {message}
                                </div>
                            </div>
                        )}
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Enter Array Elements (comma-separated)
                            </label>
                            <input
                                type="text"
                                onChange={handleArrayChange}
                                disabled={isRunning}
                                placeholder="e.g., 1, 2, 3, 4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Enter Target Value
                            </label>
                            <input
                                type="number"
                                onChange={(e) => setTarget(e.target.value)}
                                disabled={isRunning}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        <button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            Run
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default BinarySearch;