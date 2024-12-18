import Cookies from "js-cookie";
import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "@/helper/GetUserInfo";
import { decodeToken } from "@/helper/DecodeToken";
import Sidebar from "./Sidebar";
import Mainpage from "./Mainpage";
import Rightbar from "./Rightbar";
import Switch from "./Switch";
import { IUser } from "@/types/user";
import { Toaster } from "react-hot-toast";



interface userProp {
    user: IUser;
    message: string;
}

interface DashboardProp {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard = ({ darkMode, setDarkMode }: DashboardProp) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/login");
            setTimeout(() => navigate(0), 100);
            return;
        }

        const decoded = decodeToken(token);
        if (!decoded) return;

        const getUserData = async () => {
            const userData: userProp = await userInfo(decoded.id);
            setUser(userData.user);
        };

        if (decoded.id) {
            getUserData()
            setId(decoded.id);
        };
    }, [navigate]);

    return (
        <div className={`flex h-screen w-full ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <Toaster position='top-center'></Toaster>
            {/* Sidebar */}
            <Sidebar user={user} darkMode={darkMode} />

            {/* Main Content */}
            <div className="flex flex-col flex-1 h-screen">

                {/* Header Section */}
                <div className="w-full flex justify-between items-center px-6 py-4 border-b">
                    <span className="font-bold text-2xl">Hi!! {user?.name}</span>
                    <Switch
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 overflow-hidden">

                    {/* Mainpage Component with Scrollable Content */}
                    <div className="flex-1 p-4 overflow-y-auto">

                            <Mainpage id={id} darkMode={darkMode} />

                    </div>

                    {/* Rightbar */}
                    <div className="w-[27%] min-w-[300px] p-6 shadow-lg">
                        <Rightbar darkMode={darkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Dashboard;
