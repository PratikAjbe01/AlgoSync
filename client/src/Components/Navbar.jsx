import { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const algorithms = [
  { name: 'Linear Search', path: '/linearsearch' },
  { name: 'Binary Search', path: '/binarysearch' },
  { name: "Kadane's Algorithm", path: '/kadanealgo' },
  { name: 'Two Pointer', path: '/twopointer' },
  { name: 'Stack', path: '/stack' },
  { name: 'Queue', path: '/queue' },
  { name: 'Dequeue', path: '/dqueue' },
  { name: 'Linked List', path: '/linklist' },
  { name: 'Sliding Window', path: '/slidingwindow' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const filteredAlgorithms = algorithms.filter((algo) =>
    algo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleAlgoSelect = (path) => {
    setSearchQuery('');
    setShowResults(false);
    navigate(path);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <nav className="fixed top-0 w-full backdrop-blur-sm bg-white/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl sm:text-2xl font-semibold">
              Algo<span className="text-blue-500 font-bold">Sync</span>
              <span className="text-blue-500">...</span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div ref={searchRef} className="relative w-full">
              <input
         
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowResults(true)}
                className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-200/20 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                    placeholder-gray-400 backdrop-blur-sm"
                placeholder="Search Algo..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                {searchQuery ? (
                  <X size={20} className="text-gray-400 cursor-pointer" onClick={clearSearch} />
                ) : (
                  <Search size={20} className="text-gray-400" />
                )}
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchQuery && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                  {filteredAlgorithms.length > 0 ? (
                    filteredAlgorithms.map((algo) => (
                      <button
                        key={algo.path}
                        onClick={() => handleAlgoSelect(algo.path)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        {algo.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No algorithms found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              {isOpen ? (
                <X size={24} className="text-gray-600" />
              ) : (
                <Menu size={24} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div ref={searchRef} className="relative mt-3 mb-4">
                <input
            
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowResults(true)}
                  className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-200/20 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                    placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Search Algo..."
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  {searchQuery ? (
                    <X size={20} className="text-gray-400 cursor-pointer" onClick={clearSearch} />
                  ) : (
                    <Search size={20} className="text-gray-400" />
                  )}
                </div>

                {/* Mobile Search Results Dropdown */}
                {showResults && searchQuery && (
                  <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    {filteredAlgorithms.length > 0 ? (
                      filteredAlgorithms.map((algo) => (
                        <button
                          key={algo.path}
                          onClick={() => handleAlgoSelect(algo.path)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                          {algo.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">No algorithms found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Items */}
              <Link to="/" className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                Home
              </Link>
              {algorithms.map((algo) => (
                <Link
                  key={algo.path}
                  to={algo.path}
                  className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  {algo.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;