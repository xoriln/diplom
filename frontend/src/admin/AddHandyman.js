import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import {Link} from 'react-router-dom'
import {createHandyman, getCategories} from './apiAdmin'

const AddHandyman = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        categories: [],
        category: '',
        information: '',
        photo: '',
        loading: false,
        error: '',
        createdHandyman: '',
        redirectToProfile: false,
        formData: ''
    })

    const {user, token} = isAuthenticated()

    const {
        name,
        description,
        categories,
        category,
        information,
        photo,
        loading,
        error,
        createdHandyman,
        redirectToProfile,
        formData 
    } = values

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: "", loading: true})
        
        createHandyman(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values, name: '', description: '', photo: '', information: '', loading: false, createdHandyman: data.name
                })
            }
        })
    }

    const newPostForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h4>Опубликовать фото</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo')} type="file" name="фото" accept="image/*" />
                </label>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Имя</label>
                <input onChange={handleChange('name')} className="form-control" value={name}/>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Описание</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description}/>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Информация</label>
                <textarea onChange={handleChange('information')} className="form-control" value={information}/>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Ремесло</label>
                <select onChange={handleChange('category')} className="form-control"> 
                    <option>Пожалуйста выберите</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <button className='btn btn-outline-primary'>
                Создать мастера
            </button>
        </form>
    )

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{display: createdHandyman ? '' : 'none'}}>
            <h2>{`${createdHandyman}`} создано!</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className='alert alert-success'>
                <h2>Загрузка...</h2>
            </div>
        )
    )

    return (
        <Layout title='Добавить нового мастера' description={`${user.name}, готовы добавить нового мастера?`}>
            <div className='row' style={{marginRight: 0 + 'px'}}>
                <div className='col-md-8 offset-md-2'>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddHandyman