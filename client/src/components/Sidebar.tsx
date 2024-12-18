import Favourites from "./Favourites";
import Menu from "./Menu";
import Profile from "./Profile";
import { IUser } from "@/types/user";
import { Button } from "./ui/button";
import { Logout } from "@/helper/Logout";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
    user: IUser | null;
    darkMode: boolean;
}

const Sidebar = ({ user, darkMode }: SidebarProps) => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        Logout();
        setTimeout(() => { navigate(0) }, 100);
    }
    return (
        <div
            className={`w-[18%] min-w-[250px] ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                } flex flex-col shadow-lg h-screen transition duration-300`}
        >
            <Link to="/profile"><Profile user={user} darkMode={darkMode} /></Link>
            <Menu darkMode={darkMode} />
            <Favourites darkMode={darkMode} />
            <Button className="w-[70%] bg-yellow-500 ml-5 mt-5" onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default Sidebar;
