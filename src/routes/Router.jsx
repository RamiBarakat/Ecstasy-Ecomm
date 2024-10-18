import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/user/Login/Login";
import Root from "../root";
import Home from '../components/user/Home/Home'
import Register from "../pages/user/Register/Register";
import Product from "../pages/user/Product/Product";
import CategoryDetails from "../pages/user/CategoryDetails/CategoryDetails";
import Cart from "../pages/user/Cart/Cart";
import ProductsPage from "../pages/user/ProductsPage/ProductsPage";
import CategoryPage from "../pages/user/CategoryPage/CategoryPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children:[
            {
            path: '/',
            element:<Home/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
            path:"/category_details/:id",
            element:<CategoryDetails/>
        },
        {
            path:"/product/:productId",
            element:<Product/>
        },
        {
            path: '/cart',
            element:<Cart/>
        },
        {
            path: '/products',
            element: <ProductsPage/>
        },
        {
            path: '/all_categories',
            element: <CategoryPage/>
        }
    ]
    }

]);


export default router;