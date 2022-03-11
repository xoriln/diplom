import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getHandymans, read} from './apiCore'
import {Link} from 'react-router-dom'
import CardMaster from './CardMaster'

const Master = (props) => {

    const [handyman, setHandyman] = useState({})
    const [error, setError] = useState(false)

    const loadSingleHandyman = handymanId => {
        read(handymanId).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setHandyman(data)
            }
        })
    }

    useEffect(() => {
        const handymanId = props.match.params.handymanId
        loadSingleHandyman(handymanId)
    }, [])

    return (
        <Layout title={`Мастер: ${handyman.name}`} description='' className="container-fluid">
            <div className="row">
                {
                    <CardMaster handyman={handyman}/>
                }
            </div>
        </Layout>
    )
}

export default Master