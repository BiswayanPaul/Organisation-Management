import User from "../schemas/user.js";

export async function getUserById(id: string) {
    try {
        const user = await User.findOne({ _id:id })
        if (!user) {
            return { "Message": "No User found" };
        }
        return user;
    } catch (e) {
        console.log(e);
        return;
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return { "Message": "No User found" };
        }
        return user;
    } catch (e) {
        console.log(e);
        return;
    }
}