import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'

const Dashboard = () => {
    // eslint-disable-next-line
    const {user: {_id, name, email, role}} = isAuthenticated()

    const userLinks = () => {
        return (
            <div className='card'>
                <h4 className='card-header'>Ссылки пользователя</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to= {`/profile/${_id}`}>Обновить профиль</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
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
        <Layout title="Страница профиля" description='' className="container-fluid">
            <div className='row'>
                <div className='col-3'>
                    {userLinks()}
                </div>
                <div className='col-9'>
                    {userInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard