import { Link } from "react-router-dom";
import './Navbar.css';

export const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/movie-list'>Mes films connard</Link>
        </nav>
    )
};