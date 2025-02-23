import React, { useState } from 'react';

function Dequeue() {
    const [array, setArray] = useState(new Array(5).fill(undefined));
    const [input, setInput] = useState('');
    const [highlightind, setHighlightind] = useState(-1);
    const [message, setMessage] = useState('');
    const [size, setSize] = useState(5);
    const [front, setFront] = useState(-1);
    const [rear, setRear] = useState(0);

    const handleSize = (e) => {
        const newSize = parseInt(e.target.value);
        setSize(newSize);
        setArray(new Array(newSize).fill(undefined));
        setFront(-1);
        setRear(0);
        setMessage(`Queue size set to ${newSize}`);
    };

    const isFull = () => {
        return (front === 0 && rear === size - 1) || front === rear + 1;
    };

    const isEmpty = () => {
        return front === -1;
    };

    const addElementFront = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (isFull()) {
            setMessage('Queue Overflow!');
            return;
        }

        const newArray = [...array];
        let newFront = front;

        if (front === -1) {
            newFront = 0;
            setRear(0);
        } else if (front === 0) {
            newFront = size - 1;
        } else {
            newFront = front - 1;
        }

        newArray[newFront] = input;
        setArray(newArray);
        setFront(newFront);
        setHighlightind(newFront);
        setMessage(`Inserted at front: ${input}`);
        setInput('');

        setTimeout(() => {
            setHighlightind(-1);
        }, 1000);
    };

    const addElementRear = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (isFull()) {
            setMessage('Queue Overflow!');
            return;
        }

        const newArray = [...array];
        let newRear = rear;

        if (front === -1) {
            setFront(0);
            newRear = 0;
        } else if (rear === size - 1) {
            newRear = 0;
        } else {
            newRear = rear + 1;
        }

        newArray[newRear] = input;
        setArray(newArray);
        setRear(newRear);
        setHighlightind(newRear);
        setMessage(`Inserted at rear: ${input}`);
        setInput('');

        setTimeout(() => {
            setHighlightind(-1);
        }, 1000);
    };

    const removeElementFront = (e) => {
        e.preventDefault();
        if (isEmpty()) {
            setMessage('Queue Underflow!');
            return;
        }

        const newArray = [...array];
        setHighlightind(front);
        const removedElement = newArray[front];
        newArray[front] = undefined;

        let newFront = front;
        if (front === rear) {
            newFront = -1;
            setRear(-1);
        } else if (front === size - 1) {
            newFront = 0;
        } else {
            newFront = front + 1;
        }

        setArray(newArray);
        setFront(newFront);
        setMessage(`Removed from front: ${removedElement}`);

        setTimeout(() => {
            setHighlightind(-1);
        }, 1000);
    };

    const removeElementRear = (e) => {
        e.preventDefault();
        if (isEmpty()) {
            setMessage('Queue Underflow!');
            return;
        }

        const newArray = [...array];
        setHighlightind(rear);
        const removedElement = newArray[rear];
        newArray[rear] = undefined;

        let newRear = rear;
        if (front === rear) {
            setFront(-1);
            newRear = -1;
        } else if (rear === 0) {
            newRear = size - 1;
        } else {
            newRear = rear - 1;
        }

        setArray(newArray);
        setRear(newRear);
        setMessage(`Removed from rear: ${removedElement}`);

        setTimeout(() => {
            setHighlightind(-1);
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                    <div className="mb-8">
                        <div className="space-y-4 flex flex-wrap justify-center">
                            <div className="flex items-center space-x-2 border-2 border-gray-200 p-2 sm:p-4 rounded-lg w-full sm:w-auto overflow-x-auto">
                                {array.map((value, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            flex items-center justify-center
                                            sm:w-12 h-12 sm:h-12 w-12 text-base sm:text-lg font-semibold
                                            transition-colors duration-200 border-2
                                            ${index === front ? 'bg-blue-500' : 'bg-gray-200'}
                                            ${index === rear ? 'bg-green-500' : ''}
                                            ${highlightind === index ? 'bg-yellow-300' : 'bg-white'}
                                        `}
                                    >
                                        {value}
                                    </div>
                                ))}
                            </div>
                            <div className="w-full text-center mt-2 text-sm text-gray-600">
                                Front: {front}, Rear: {rear}
                            </div>
                            {message && (
                                <div className="w-full text-center mt-2 text-blue-600 text-sm sm:text-base">
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>

                    <form className="space-y-4 sm:space-y-6 max-w-md mx-auto">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Enter Element
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                placeholder="Enter value"
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md 
                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                         text-sm sm:text-base"
                            />
                        </div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                                onClick={addElementFront}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-blue-700 focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                INSERT FRONT
                            </button>
                            <button
                                onClick={addElementRear}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-blue-700 focus:outline-none focus:ring-2 
                                         focus:ring-blue-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                INSERT REAR
                            </button>
                            <button
                                onClick={removeElementFront}
                                className="bg-red-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-red-700 focus:outline-none focus:ring-2 
                                         focus:ring-red-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                DELETE FRONT
                            </button>
                            <button
                                onClick={removeElementRear}
                                className="bg-red-600 text-white py-2 px-4 rounded-md 
                                         hover:bg-red-700 focus:outline-none focus:ring-2 
                                         focus:ring-red-500 focus:ring-offset-2 
                                         text-sm sm:text-base transition-colors duration-200"
                            >
                                DELETE REAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Dequeue;