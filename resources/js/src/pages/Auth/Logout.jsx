import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('user', "")
        localStorage.setItem('isLoggedIn', "false");
        navigate("/login")
    })

    return (<></>)
}

export default Logout;