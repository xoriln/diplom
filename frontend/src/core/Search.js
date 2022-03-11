import React, {useState, useEffect} from "react";
import Card from './Card'
import {getCategories, list} from './apiCore'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const {categories, category, search, results, searched} = data

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        })
    }


    useEffect(() => {
        loadCategories()
    }, [])


    const searchData = () => {
        if(search) {
            list({search: search || undefined, category: category})
            .then(response => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    setData({...data, results: response, searched: true})
                }
            })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const handleChange = (name) => event =>{
        setData({...data, [name]: event.target.value, searched: false})
    }

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Нашел ${results.length}`
        } 
        if(searched && results.length < 1) {
            return `Мастера не найдены`
        } 
    }

    const searchedHandymans = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((handyman, i) => (
                        <Card key={i} handyman={handyman}/>
                    ))}
                </div>  
            </div>
        )
    }

    const searchFrom = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">Все</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Поиск по имени"/>
                </div>
                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text">Поиск</button>
                </div>
            </span>
        </form>
    )

    return (
        <div className="row">
            <div className="container mb-3">         
                {searchFrom()}
            </div>
            <div className="container-fluid mb-3">         
                {searchedHandymans(results)}
                <hr />
            </div>
        </div>
    )
}

export default Search