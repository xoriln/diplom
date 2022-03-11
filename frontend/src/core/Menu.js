import React, {Fragment} from "react";
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: '#ffffff'}
    }
}


const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">
                    Главная
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/category')} to="/category">
                    Ремесла
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/masters')} to="/masters">
                    Мастера
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">
                    Профиль
                </Link>
            </li>
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
                            Войти
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                            Зарегистрироваться
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
            <li className="nav-item">
                <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signout(() => {
                    history.push("/")
                })}>
                    Выйти
                </span>
            </li>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);