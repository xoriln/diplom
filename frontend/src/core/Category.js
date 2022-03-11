import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import CardCategory from './CardCategory'
import {getCategories} from "./apiCore"
import {Link} from 'react-router-dom'

const Category = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    const init = () => {
        getCategories('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <Layout title='Страница ремесел' description="" className="container-fluid">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        {categories.map((categories, i) => 
                            <CardCategory key={i} categories={categories} />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Category