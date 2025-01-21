import { useNavigate } from "react-router-dom";
import '../App/App.css';

const HomePage = () => {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    }

    return (
        <div>
            <h1>Homepage</h1>
            <p>Welcome, {username}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default HomePage;