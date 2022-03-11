import React from "react";
import {Link} from "react-router-dom"

const CardCategory = ({categories}) => {
    return (
        <div className="col-4 mb-3">
            <div className="card" style={{minHeight: "700px" }}>
                <div className="card-header">{categories.name}</div>
                <div className="card-body">
                    <p>{categories.information}</p>
                </div>
            </div>
        </div>
    )
}

export default CardCategory