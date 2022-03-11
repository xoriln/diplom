import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Category from './core/Category'
import Handyman from './core/Handyman'
import Masters from './core/Masters'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from "./user/UserDashboard"
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from "./user/AdminDashboard"
import AddCategory from "./admin/AddCategory"
import AddHandyman from "./admin/AddHandyman"
import UpdateHandyman from "./admin/UpdateHandyman"
import Master from './core/Master'
import Profile from "./user/Profile"
import ManageHandymans from "./admin/ManageHandymans"

const Routes = () => { 
    return (
    <BrowserRouter>
        <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/masters" exact component={Masters} />
            <PrivateRoute path="/category" exact component={Category} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/admin/handyman/update/:handymanId" exact component={UpdateHandyman} />
            <AdminRoute path="/create/category" exact component={AddCategory} />
            <AdminRoute path="/create/handyman" exact component={AddHandyman} />
            <AdminRoute path="/admin/handymans" exact component={ManageHandymans} />
            <PrivateRoute path="/master/:handymanId" exact component={Master} />
        </Switch>
    </BrowserRouter>)
}

export default Routes
