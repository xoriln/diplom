import React, {useState} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'
import {createCategory} from './apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [information, setInformation] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const handleChangeName = (e) => {
        setError('')
        setName(e.target.value)
    }

    const handleChangeInformation = (e) => {
        setError('')
        setInformation(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        createCategory(user._id, token, {name, information})
        .then(data => {
            if(data.error) {
                setError(true)
            } else {
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Название</label>
                <input type="text" className="form-control" onChange={handleChangeName} value={name} autoFocus required/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Информация</label>
                <textarea type="text" className="form-control" onChange={handleChangeInformation} value={information} autoFocus required/>
            </div>
            <button className='btn btn-outline-primary'>Создать ремесло</button>
        </form>
    )

        const showSuccess = () => {
            if(success) {
                return <h3 className='text-success'>{name} создано!</h3>
            }
        }

        const showError = () => {
            if(error) {
                return <h3 className='text-danger'>Имя ремесла должно быть уникальным</h3>
            }
        }

        const goBack = () => (
            <div className='mt-5'>
                <Link to="/admin/dashboard" className='text-warning'>Назад к профилю</Link>
            </div>
        )

    return (
        <Layout title='Добавить новую категорию' description={`${user.name}, готовы добавить новую категорию?`}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory