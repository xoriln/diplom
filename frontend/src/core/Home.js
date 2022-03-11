import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getHandymans} from './apiCore'
import Card from './Card'

const Home = () => {

    const [handymansByRating, setHandymansByRating] = useState([])
    const [handymansBySell, setHandymansBySell] = useState([])
    const [error, setError] = useState(false)

    const loadHandymansByRating = () => {
        getHandymans('rating').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setHandymansByRating(data)
            }
        })
    }
    const loadHandymansBySell = () => {
        getHandymans('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setHandymansBySell(data)
            }
        })
    }

    useEffect (() => {
        loadHandymansByRating()
    }, [])

    return (
        <Layout title="Главная страница" description="Топ 3 мастеров" className="container-fluid">
            <div className="row">
                {handymansByRating.map((handyman, i) => 
                    <Card key={i} handyman={handyman} />
                )}
            </div>
        </Layout>
    )
}

export default Home