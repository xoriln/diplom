import React, {useState} from "react";
import {Redirect} from 'react-router-dom'
import Layout from "../core/Layout";
import {signin, authenticate, isAuthenticated} from "../auth"


const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const {email, password, loading, error, redirectToReferrer} = values
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSumbit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    })
                })
            }
        })
    }
 
    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Адрес эл. почты</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Пароль</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSumbit} className="btn btn-primary">
                Войти
            </button>
        </form>
    )

        const showError = () => (
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                    {error}
            </div>
        )

        const showLoading = () => (
            loading && (
            <div className="alert alert-info">
                <h2>Загрузка...</h2>
            </div>)
        )

        const redirectUser = () => {
            if(redirectToReferrer) {
                if(user && user.role === 1) {
                    return <Redirect to="/admin/dashboard" />
                } else {
                    return <Redirect to="/user/dashboard" />
                }
            }
            if(isAuthenticated()) {
                return <Redirect to="/" />
            }
        }

    return (
        <Layout title="Страница авторизации" description="Войдите!" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin