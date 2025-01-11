import React from 'react'

const ToggleButton = (props) => {
    const { mode, setMode } = props;
    
    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };
    return (
        <div className="fixed bottom-8 right-2 z-50">
            <button
                onClick={toggleTheme}
                className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex justify-center items-center hover:bg-blue-600 focus:outline-none transition-all duration-300"
                aria-label="Toggle theme"
            >
                {mode === 'light' ? '🌙' : '🌞'}
            </button>
        </div>
    )
}

export default ToggleButton