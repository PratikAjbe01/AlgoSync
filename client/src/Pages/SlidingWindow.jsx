import React, { useState } from 'react';

function SlidingWindow() {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [runData, setRunData] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [color, setColor] = useState([]);
    const [message, setMessage] = useState('');

    const highLightSearch = () => {
        let allTimers = [];
        for (let i = 0; i <= array.length - target; i++) {
            function close(i) {
                const timer = setTimeout(function () {
                    function highlightWindow(startIndex) {
                        for (let j = 0; j < target; j++) {
                            const timer = setInterval(() => {
                                setColor(prevColor => [...prevColor, startIndex + j]);
                            }, j * 500);
                            allTimers.push(timer);
                        }
                        setColor([]);
                    }
                    highlightWindow(i);
                }, i * 1000);
                allTimers.push(timer);
            }
            close(i);
        }
        // Optionally clear allTimers after finishing the process
        setTimeout(() => {
            setColor([]); // Clear color after the loop completes
        }, (array.length - target) * 1000);
    };

    const handleArrayChange = (e) => {
        const value = e.target.value;
        const inputArray = value.split(',').map(item => item.trim()).filter(item => item !== '');
        setArray(inputArray);
    };

    const handleRun = (e) => {
        e.preventDefault();
        setRunData(true);
        setIsRunning(true);
        highLightSearch();
    };

    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-8">
                        {runData && array && array.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {array.map((value, index) => (
                                        <div
                                            key={index}
                                            className={`
                                                flex items-center justify-center
                                                w-12 h-12 text-lg font-semibold rounded-md
                                                transition-colors duration-200
                                                ${color.includes(index)
                                                    ? 'bg-yellow-400 text-gray-800'
                                                    : 'bg-white border-2 border-gray-300'}
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
                                Enter Array Elements
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
                                Enter Window Size
                            </label>
                            <input
                                type="number"
                                placeholder='window size must be less than array size'
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

export default SlidingWindow;
