import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getMasters, getFilteredHandymans} from './apiCore'
import Card from './Card'
import Search from "./Search";

const Masters = () => {
    const [handymansBySell, setHandymansBySell] = useState([])
    const [error, setError] = useState(false)

    const loadHandymansBySell = () => {
        getMasters('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setHandymansBySell(data)
            }
        })
    }

    useEffect (() => {
        loadHandymansBySell()
    }, [])

    return (
        <Layout title="Страница мастеров" description="" className="container-fluid">
            <Search />
            <div className="row">
                {handymansBySell.map((handyman, i) => 
                    <Card key={i} handyman={handyman} />
                )}
            </div>
        </Layout>
    )
}

export default Masters