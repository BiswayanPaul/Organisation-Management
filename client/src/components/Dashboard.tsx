import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Logout } from "@/helper/Logout"
import { jwtDecode } from "jwt-decode"
import { userInfo } from "../helper/GetUserInfo"

interface decodedProp {
    id: string,
    email: string
}

interface userProp {
    user: object;
    message: string;
}

const Dashboard = () => {
    const navigate = useNavigate()
    const [id, setId] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [user, setUser] = useState<object | null>(null) // state for user data

    useEffect(() => {
        const token = Cookies.get("token");
        console.log(token);
        if (!token) {
            navigate("/login");
            setTimeout(() => navigate(0), 100);
            return;
        }

        const decoded: decodedProp = jwtDecode(token);
        console.log({ decoded });
        setId(decoded.id)
        setEmail(decoded.email)

        // Define async function inside useEffect
        const getUserData = async () => {
            const userData: userProp = await userInfo(decoded.id); // Pass the decoded.id
            setUser(userData.user); // Set the user data
            console.log(userData.user); // Log the user data to the console
        }

        // Call the async function inside useEffect
        if (decoded.id) {
            getUserData();
        }

    }, [navigate]) // Dependency array only depends on navigate, not id since id is being set inside the useEffect

    const handleLogout = () => {
        Logout();
        navigate(0);
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Email: {email}</p>
            <p>ID: {id}</p>
            <p>User Data: {JSON.stringify(user)}</p>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Dashboard
