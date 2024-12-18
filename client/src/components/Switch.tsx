interface SwitchProps {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switch = ({ darkMode, setDarkMode }: SwitchProps) => {
    return (
        <div
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-14 h-8 rounded-full cursor-pointer transition-all duration-300 
        ${darkMode ? "bg-gray-200" : "bg-gray-800"}`}
        >

            <div
                className={`absolute top-1/2 -translate-y-1/2 text-sm transition-all duration-300 ${darkMode ? "left-2 text-black" : "right-2 text-white"
                    }`}
            >
                {darkMode ? "⏾" : "☀️"}
            </div>


            <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300
          ${darkMode ? "translate-x-6" : "translate-x-0"}`}
            ></div>
        </div>
    );
};

export default Switch;
