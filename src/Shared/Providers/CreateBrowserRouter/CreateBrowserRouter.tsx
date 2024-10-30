import { createBrowserRouter } from 'react-router-dom';
import Landing from '../../../Pages/Landing/ui/Landing';
const Router= createBrowserRouter([
    {

        path:'/',
        element:<Landing/>,
        
    },
]);

export { Router };