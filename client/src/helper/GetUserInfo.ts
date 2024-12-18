export const userInfo = async (id:string) => {
    if(!id) return;
    const data = await fetch(`http://localhost:3000/user/getuser/${id}`)
    const res = await data.json()
    return res;
}