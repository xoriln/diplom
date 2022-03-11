import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'

const AdminDashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className='card'>
                <h4 className='card-header'>Ссылки администратора</h4>
                <ul className='list-group'>
                <li className='list-group-item'>
                        <Link className='nav-link' to="/create/category">Создать ремесло</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to="/create/handyman">Создать мастера</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to="/admin/handymans">Менеджер мастеров</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>Информация о пользователе</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>{role === 1 ? 'Админ' : 'Зарегистрированный пользователь'}</li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title='Страница админа' description="" className="container-fluid">
            <div className='row'>
                <div className='col-3'>
                    {adminLinks()}
                </div>
                <div className='col-9'>
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard