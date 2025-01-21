import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Login";
import Private from "../Private";
import HomePage from "../HomePage";
import CreateTicket from "../CreateTicket";

const Router = createBrowserRouter([
    {
        path: '/',
        element: (
            <App>
                <Login />
            </App>
        ),
    },
    {
        path: '/home',
        element: (
            <Private>
                <App>
                    <HomePage />
                </App>
            </Private>
        ),
    },
    {
        path: '/ticket',
        element: (
            <Private>
                <App>
                    <CreateTicket />
                </App>
            </Private>
        ),
    }
]);

export default Router;