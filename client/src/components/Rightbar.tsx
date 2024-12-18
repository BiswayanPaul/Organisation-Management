interface RightbarProps {
    darkMode: boolean;
}

const Rightbar = ({ darkMode }: RightbarProps) => {
    return (
        <div
            className={`w-[100%] ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-black"
                } px-6 py-6 shadow-lg transition duration-300`}
        >
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <div className="bg-green-100 p-3 rounded-md shadow-sm mb-4">
                <span className="text-green-700 font-medium">Project Discovery Call</span>
                <div className="text-sm text-gray-500 mt-1">30 minutes</div>
            </div>
        </div>
    );
};

export default Rightbar;
