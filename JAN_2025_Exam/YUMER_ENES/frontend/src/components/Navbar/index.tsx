import { useNavigate } from 'react-router-dom';
import '../App/App.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleClickHome = () => {
        if (token) {
            navigate('/home');
        } else {
            navigate('/');
        }
    }

    return (
        <nav>
            <button onClick={handleClickHome}>Home</button>
            <button onClick={() => navigate('/ticket')}>Create a ticket</button>
        </nav>
    );
}

export default Navbar;