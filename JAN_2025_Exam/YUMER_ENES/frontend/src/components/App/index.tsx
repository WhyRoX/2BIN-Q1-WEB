import Footer from '../Footer';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';

const App = ({ children }: { children?: React.ReactNode }) => {
    return (
        <>
            <div>
                <Navbar />
                <main>
                    {children || <Outlet />}
                </main>
                <Footer />
            </div>
        </>
    )
};

export default App;