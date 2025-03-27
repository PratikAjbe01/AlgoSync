import { Link } from 'react-router-dom';
import { Search, Binary, Layers, MousePointerClick, Box, ListOrdered, LayoutList, SlidersHorizontal, Network } from 'lucide-react';

const algorithms = [
  {
    name: 'Two Pointer',
    description: 'Technique using two pointers to solve array-related problems.',
    path: '/twopointer',
    icon: MousePointerClick,
    category: 'Array'
  },
  {
    name: 'Stack',
    description: 'Last-In-First-Out (LIFO) data structure implementation.',
    path: '/stack',
    icon: Box,
    category: 'Data Structure'
  },
  {
    name: 'Queue',
    description: 'First-In-First-Out (FIFO) data structure implementation.',
    path: '/queue',
    icon: ListOrdered,
    category: 'Data Structure'
  },
  {
    name: 'Dequeue',
    description: 'Double-ended queue implementation with both FIFO and LIFO operations.',
    path: '/dqueue',
    icon: LayoutList,
    category: 'Data Structure'
  },
  {
    name: 'Linked List',
    description: 'Linear data structure with elements linked using pointers.',
    path: '/linklist',
    icon: Network,
    category: 'Data Structure'
  },
  {
    name: 'Sliding Window',
    description: 'Technique for solving array/string problems using a window.',
    path: '/slidingwindow',
    icon: SlidersHorizontal,
    category: 'Array'
  },
  {
    name: 'Sorting Algorithm',
    description: 'all 5 major sorting algo bubble ,selection,merge,quick,insertion.',
    path: '/Sorting',
    icon: SlidersHorizontal,
    category:  'Sorting'
  },
  {
    name: 'Linear Search',
    description: 'Sequential search algorithm that checks every element in the list.',
    path: '/linearsearch',
    icon: Search,
    category: 'Searching'
  },
  {
    name: 'Binary Search',
    description: 'Efficient search algorithm for sorted arrays using divide and conquer.',
    path: '/binarysearch',
    icon: Binary,
    category: 'Searching'
  },
  {
    name: "Kadane's Algorithm",
    description: 'Find the maximum subarray sum in a one-dimensional array.',
    path: '/kadanealgo',
    icon: Layers,
    category: 'Dynamic Programming'
  },

];

function Home() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-500">AlgoSync</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Visualize and understand algorithms and data structures through interactive demonstrations.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo) => (
          <Link
            key={algo.path}
            to={algo.path}
            className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <algo.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-500 transition-colors">
                  {algo.name}
                </h3>
                <p className="text-gray-600 text-sm">{algo.description}</p>
                <span className="inline-block mt-3 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {algo.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;