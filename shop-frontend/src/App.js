import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Products from "./containers/Products/Products";
import Product from "./containers/Product/Product";
import NewProduct from "./containers/NewProduct/NewProduct";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {useSelector} from "react-redux";
import Profile from './containers/UserProfile/Profile';
import EditProduct from "./containers/Product/EditProduct";
import EditCategory from "./containers/Categories/EditCategory";
import NewCategory from "./containers/Categories/NewCategory";
import Categories from "./containers/Categories/Catedories";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
    <Layout>
        <Switch>
            <Route path="/" exact component={Products}/>
            <ProtectedRoute
                isAllowed={user?.role === 'admin'}
                redirectTo="/"
                path="/products/new"
                component={NewProduct}
            />
            <Route path="/products/:id" component={Product}/>
            <Route exact path="/edit/:id" component={EditProduct} />
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/categories" exact component={Categories} />
            <Route path="/categories/new" component={NewCategory} />
            <Route path="/categories/edit/:id" component={EditCategory} />

        </Switch>
    </Layout>
);
}
export default App;