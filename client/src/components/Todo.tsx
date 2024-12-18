import { decodeToken } from "@/helper/DecodeToken";
import Cookies from "js-cookie";
import { userInfo } from "../helper/GetUserInfo";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

interface userProp {
    user: object;
    message: string;
}

const Todo = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<object | null>(null) // state for user data

    useEffect(() => {
        const token = Cookies.get("token");


        // console.log(token);
        if (!token) {
            navigate("/login");
            setTimeout(() => navigate(0), 100);
            return;
        }

        const decoded = decodeToken(token);

        if (!decoded) return;

        const getUserData = async () => {
            const userData: userProp = await userInfo(decoded.id); // Pass the decoded.id
            setUser(userData.user); // Set the user data
            // console.log(userData.user); // Log the user data to the console
        }

        // Call the async function inside useEffect
        if (decoded.id) {
            getUserData();
        }

    }, [navigate])

    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}

export default Todo