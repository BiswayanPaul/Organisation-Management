import { jwtDecode } from "jwt-decode";

interface decodedProp {
    id: string,
    email: string
}

export const decodeToken = (token: string | undefined) => {

    if (!token) {
        return;
    }
    // console.log(token);
    const decoded: decodedProp = jwtDecode(token);
    // console.log({ decoded });

    return decoded;
}