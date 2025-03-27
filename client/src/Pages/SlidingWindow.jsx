import React, { useState, useEffect } from 'react';

function SlidingWindowMaxSum() {
    const [array, setArray] = useState([]);
    const [windowSize, setWindowSize] = useState(0);
    const [currentWindow, setCurrentWindow] = useState([]);
    const [windowSums, setWindowSums] = useState([]);
    const [maxWindowSum, setMaxWindowSum] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('');

    const runSlidingWindow = () => {
        // Validate inputs
        if (!array || array.length === 0 || !windowSize || windowSize > array.length || windowSize <= 0) {
            setMessage('Please enter a valid array and window size.');
            return;
        }

        // Reset state
        setIsRunning(true);
        setMessage('');
        setWindowSums([]);
        setMaxWindowSum(null);
        
        // Create a sequence of windows with their sums
        const windows = [];
        const sums = [];
        let maxSum = -Infinity;
        let maxSumWindow = [];

        for (let i = 0; i <= array.length - windowSize; i++) {
            const window = array.slice(i, i + windowSize);
            const windowSum = window.reduce((sum, num) => sum + num, 0);
            
            windows.push(window);
            sums.push(windowSum);

            // Track maximum sum window
            if (windowSum > maxSum) {
                maxSum = windowSum;
                maxSumWindow = window;
            }
        }

        // Animate windows
        let index = 0;
        const windowInterval = setInterval(() => {
            if (index < windows.length) {
                setCurrentWindow(windows[index]);
                setWindowSums(sums.slice(0, index + 1));
                index++;
            } else {
                clearInterval(windowInterval);
                setIsRunning(false);
                setMessage('Sliding window visualization complete.');
                setMaxWindowSum(maxSum);
                setCurrentWindow([]);
            }
        }, 1000);
    };

    const handleArrayChange = (e) => {
        const value = e.target.value;
        const inputArray = value.split(',')
            .map(item => {
                const trimmed = item.trim();
                return trimmed !== '' ? Number(trimmed) : null;
            })
            .filter(item => item !== null);
        setArray(inputArray);
    };

    const handleWindowSizeChange = (e) => {
        setWindowSize(Number(e.target.value));
    };

    const handleRun = (e) => {
        e.preventDefault();
        runSlidingWindow();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Sliding Window Max Sum Visualizer
                </h2>

                {/* Array Display */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {array.map((value, index) => (
                            <div
                                key={index}
                                className={`
                                    w-12 h-12 flex items-center justify-center 
                                    rounded-md text-lg font-semibold
                                    ${currentWindow.includes(value) 
                                        ? 'bg-yellow-400 text-gray-800' 
                                        : 'bg-gray-200 text-gray-600'}
                                `}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Window Sums Display */}
                {windowSums.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-center mb-2">Window Sums</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {windowSums.map((sum, index) => (
                                <div 
                                    key={index} 
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md"
                                >
                                    Sum {index + 1}: {sum}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Max Sum Display */}
                {maxWindowSum !== null && (
                    <div className="mb-6 text-center">
                        <h3 className="text-xl font-bold text-green-700">
                            Maximum Window Sum: {maxWindowSum}
                        </h3>
                    </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleRun} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Array Elements (comma-separated)
                        </label>
                        <input
                            type="text"
                            onChange={handleArrayChange}
                            disabled={isRunning}
                            placeholder="e.g., 1, 2, 3, 4, 5, 6"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                       focus:ring-2 focus:ring-blue-500 
                                       disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Window Size
                        </label>
                        <input
                            type="number"
                            onChange={handleWindowSizeChange}
                            disabled={isRunning}
                            placeholder="Enter window size"
                            min="1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                                       focus:ring-2 focus:ring-blue-500 
                                       disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isRunning}
                        className="w-full bg-blue-600 text-white py-2 rounded-md 
                                   hover:bg-blue-700 focus:outline-none focus:ring-2 
                                   focus:ring-blue-500 focus:ring-offset-2 
                                   disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isRunning ? 'Running...' : 'Visualize Sliding Window'}
                    </button>
                </form>

                {/* Message Display */}
                {message && (
                    <div className="mt-4 text-center text-sm text-gray-600">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SlidingWindowMaxSum;