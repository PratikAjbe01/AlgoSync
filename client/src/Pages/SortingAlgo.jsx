import React, { useState, useEffect } from 'react';

function SortingAlgo() {
    const [array, setArray] = useState([]);
    const [sortingAlgorithm, setSortingAlgorithm] = useState('bubbleSort');
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState([]);
    const [comparedIndices, setComparedIndices] = useState([]);
    const [sortedIndices, setSortedIndices] = useState([]);
    const [message, setMessage] = useState('');
    const [genrateArr,setGenrateArr]=useState(false);

    // Generate random array
    const generateArray = (size = 10) => {
        const newArray = Array.from(
            { length: size }, 
            () => Math.floor(Math.random() * 50) + 1
        );
        setArray(newArray);
        setCurrentStep([...newArray]);
        setComparedIndices([]);
        setSortedIndices([]);
        setMessage('');
    };

    // Bubble Sort Algorithm
    const bubbleSort = (arr) => {
        const steps = [];
        const n = arr.length;
        const sortedArr = [...arr];

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                steps.push({
                    array: [...sortedArr],
                    compared: [j, j + 1],
                    sorted: []
                });

                if (sortedArr[j] > sortedArr[j + 1]) {
                    // Swap elements
                    [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
                }
            }
            // Last element of each pass is sorted
            steps.push({
                array: [...sortedArr],
                compared: [],
                sorted: [n - i - 1]
            });
        }

        return steps;
    };

    // Selection Sort Algorithm
    const selectionSort = (arr) => {
        const steps = [];
        const n = arr.length;
        const sortedArr = [...arr];

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                steps.push({
                    array: [...sortedArr],
                    compared: [minIndex, j],
                    sorted: []
                });

                if (sortedArr[j] < sortedArr[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element
            if (minIndex !== i) {
                [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
            }

            // Mark current index as sorted
            steps.push({
                array: [...sortedArr],
                compared: [],
                sorted: [i]
            });
        }

        return steps;
    };

    // Insertion Sort Algorithm
    const insertionSort = (arr) => {
        const steps = [];
        const n = arr.length;
        const sortedArr = [...arr];

        for (let i = 1; i < n; i++) {
            let key = sortedArr[i];
            let j = i - 1;

            while (j >= 0 && sortedArr[j] > key) {
                steps.push({
                    array: [...sortedArr],
                    compared: [j, j + 1],
                    sorted: []
                });

                sortedArr[j + 1] = sortedArr[j];
                j--;
            }
            sortedArr[j + 1] = key;

            steps.push({
                array: [...sortedArr],
                compared: [],
                sorted: [i]
            });
        }

        return steps;
    };

    // Merge Sort Algorithm
    const mergeSort = (arr) => {
        const steps = [];
        const arrCopy = [...arr];
    
        const merge = (array, left, mid, right) => {
            let i = left;
            let j = mid + 1;
            let k = 0;
            const temp = [];
    
            while (i <= mid && j <= right) {
                steps.push({
                    array: [...array],
                    compared: [i, j],
                    sorted: []
                });
    
                if (array[i] <= array[j]) {
                    temp[k++] = array[i++];
                } else {
                    temp[k++] = array[j++];
                }
            }
    
            while (i <= mid) {
                steps.push({
                    array: [...array],
                    compared: [i, -1], // Indicate only one index compared
                    sorted: []
                });
                temp[k++] = array[i++];
            }
    
            while (j <= right) {
                steps.push({
                    array: [...array],
                    compared: [-1, j], // Indicate only one index compared
                    sorted: []
                });
                temp[k++] = array[j++];
            }
    
            for (let l = 0; l < k; l++) {
                array[left + l] = temp[l];
            }
    
            steps.push({
                array: [...array],
                compared: [],
                sorted: Array.from({ length: k }, (_, index) => left + index)
            });
        };
    
        const mergeSortRecursive = (array, left, right) => {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                mergeSortRecursive(array, left, mid);
                mergeSortRecursive(array, mid + 1, right);
                merge(array, left, mid, right);
            }
        };
    
        mergeSortRecursive(arrCopy, 0, arrCopy.length - 1);
        return steps;
    };

    // Quick Sort Algorithm
    const quickSort = (arr) => {
        const steps = [];
        const arrCopy = [...arr];

        const partition = (low, high) => {
            const pivot = arrCopy[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                steps.push({
                    array: [...arrCopy],
                    compared: [j, high],
                    sorted: []
                });

                if (arrCopy[j] < pivot) {
                    i++;
                    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
                }
            }

            [arrCopy[i + 1], arrCopy[high]] = [arrCopy[high], arrCopy[i + 1]];
            return i + 1;
        };

        const quickSortRecursive = (low, high) => {
            if (low < high) {
                const pivotIndex = partition(low, high);
                
                steps.push({
                    array: [...arrCopy],
                    compared: [],
                    sorted: [pivotIndex]
                });

                quickSortRecursive(low, pivotIndex - 1);
                quickSortRecursive(pivotIndex + 1, high);
            }
        };

        quickSortRecursive(0, arrCopy.length - 1);
        return steps;
    };

    // Run Sort Visualization
    const runSortVisualization = () => {
        if (array.length === 0) {
            setMessage('Please generate an array first.');
            return;
        }

        setIsRunning(true);
        setMessage('Sorting in progress...');

        let sortSteps;
        switch (sortingAlgorithm) {
            case 'bubbleSort':
                sortSteps = bubbleSort(array);
                break;
            case 'selectionSort':
                sortSteps = selectionSort(array);
                break;
            case 'insertionSort':
                sortSteps = insertionSort(array);
                break;
            case 'mergeSort':
                sortSteps = mergeSort(array);
                break;
            case 'quickSort':
                sortSteps = quickSort(array);
                break;
            default:
                setMessage('Invalid sorting algorithm');
                setIsRunning(false);
                return;
        }

        // Animate sorting steps
        let stepIndex = 0;
        const sortInterval = setInterval(() => {
            if (stepIndex < sortSteps.length) {
                const step = sortSteps[stepIndex];
                setCurrentStep(step.array);
                setComparedIndices(step.compared);
                setSortedIndices(step.sorted);
                stepIndex++;
            } else {
                clearInterval(sortInterval);
                setIsRunning(false);
                setMessage('Sorting completed!');
                setComparedIndices([]);
                setSortedIndices(Array.from({length: array.length}, (_, i) => i));
            }
        }, 500);
    };

    // Initial array generation on component mount
    useEffect(() => {
        generateArray();
    }, [genrateArr]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Sorting Algorithms Visualizer
                </h2>

                {/* Array Visualization */}
                <div className="mb-6 flex justify-center items-end h-64">
                    {currentStep.map((value, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center mx-1 w-12"
                        >
                            <div
                                className={`
                                    w-full 
                                    ${comparedIndices.includes(index) ? 'bg-red-500' : 
                                    sortedIndices.includes(index) ? 'bg-green-500' : 
                                    'bg-blue-500'}
                                `}
                                style={{
                                    height: `${value * 3}px`,
                                    transition: 'height 0.5s, background-color 0.5s'
                                }}
                            />
                            <span className="text-sm mt-1 text-gray-700">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Algorithm Information */}
                <div className="mb-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-700">
                        {sortingAlgorithm === 'bubbleSort' ? 'Bubble Sort' :
                         sortingAlgorithm === 'selectionSort' ? 'Selection Sort' :
                         sortingAlgorithm === 'insertionSort' ? 'Insertion Sort' :
                         sortingAlgorithm === 'mergeSort' ? 'Merge Sort' :
                         sortingAlgorithm === 'quickSort' ? 'quickSort':'quickSort'  }
                    </h3>
                </div>

                {/* Controls */}
                <div className="mb-6 flex flex-wrap justify-center gap-4">
                    <select
                        value={sortingAlgorithm}
                        onChange={(e) => setSortingAlgorithm(e.target.value)}
                        disabled={isRunning}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="bubbleSort">Bubble Sort</option>
                        <option value="selectionSort">Selection Sort</option>
                        <option value="insertionSort">Insertion Sort</option>
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">Quick Sort</option>
                    </select>

                    <button
                    onClick={()=>setGenrateArr(!genrateArr)}
                     
                        disabled={isRunning}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        Generate New Array
                    </button>

                    <button
                        onClick={runSortVisualization}
                        disabled={isRunning}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                    >
                        Sort
                    </button>
                </div>

                {/* Complexity Information */}
                <div className="text-center text-gray-600">
                    <h4 className="font-semibold">Complexity</h4>
                    <div className="flex justify-center gap-4">
                        <span>
                            Time: {
                                sortingAlgorithm === 'bubbleSort' ? 'O(n²)' :
                                sortingAlgorithm === 'selectionSort' ? 'O(n²)' :
                                sortingAlgorithm === 'insertionSort' ? 'O(n²)' :
                                sortingAlgorithm === 'quickSort' ? 'O(n²)' :
                                sortingAlgorithm === 'mergeSort' ? 'O(n log n)' :
                                'O(n log n)'
                                
                            }
                        </span>
                        <span>
                            Space: {
                                sortingAlgorithm === 'bubbleSort' ? 'O(1)' :
                                sortingAlgorithm === 'selectionSort' ? 'O(1)' :
                                sortingAlgorithm === 'insertionSort' ? 'O(1)' :
                                sortingAlgorithm === 'quickSort' ? 'O(nlogn)' :
                                sortingAlgorithm === 'mergeSort' ? 'O(n)' :
                                'O(log n)'
                            }
                        </span>
                    </div>
                </div>

                {/* Message Display */}
                {message && (
                    <div className="text-center text-gray-600 mt-4">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SortingAlgo;