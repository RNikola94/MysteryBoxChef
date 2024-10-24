import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

export default function Navigation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div>
            <h2>Navigation</h2>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};