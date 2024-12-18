import Cookies from "js-cookie"

export const Logout = async () => {
    Cookies.remove("token");
    return;
}