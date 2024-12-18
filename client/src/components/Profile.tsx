import blankProfilepic from "../assets/blankProfilepic.png";
import { IUser } from "@/types/user";

interface ProfileProps {
    user: IUser | null;
    darkMode: boolean;
}

const Profile = ({ user, darkMode }: ProfileProps) => {
    return (
        <div
            className={`flex items-center p-4 ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            } rounded-md shadow-md m-4 transition duration-300 ${darkMode? "hover:bg-gray-600 hover:text-gray-200":"hover:bg-gray-200 hover:text-gray-600"}`}
        >
            <img
                src={blankProfilepic}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4">
                <h2 className="text-sm font-bold">{user?.name || "User Name"}</h2>
                <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                    {user?.email || "user@example.com"}
                </p>
            </div>
        </div>
    );
};

export default Profile;
