import '../App/App.css';
import Navbar from '../Navbar';

const Private = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return (
            <div>
                <Navbar />
                <h1>Support</h1>
                <p>You need to be logged in to create a ticket</p>
            </div>
        );
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default Private;