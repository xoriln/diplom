import React from "react";
import {Link} from "react-router-dom"
import ShowImage from "./ShowImage";

const Card = ({handyman}) => {
    return (
        <div className="col-4 mb-3">
            <div className="card" style={{minHeight: "550px" }}>
                <div className="card-header">{handyman.name}</div>
                <div className="card-body">
                    <ShowImage item={handyman} url="handyman"/>
                    <p>{handyman.description.substring(0, 50) + '...'}</p>
                    <p>Ремесло: {handyman.category.name}</p>
                    <p>Рейтинг: {handyman.rating}</p>
                    <Link to={`/master/${handyman._id}`}>
                        <button style={{marginLeft: '135px'}} className="btn btn-outline-primary mt-2 mb-2">
                            Страница мастера
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card