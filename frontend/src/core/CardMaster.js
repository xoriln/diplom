import React from "react";
import {Link} from "react-router-dom"
import ShowImage from "./ShowImage";

const CardMaster = ({handyman}) => {
    return (
            <div className="card mb-5" style={{minWidth: '1300px', maxWidth: '1300px', marginLeft: '100px'}}>
                <div className="card-header" style={{display: 'flex', justifyContent: 'center'}}>{handyman.name}</div>
                <div className="card-body" style={{Overflow: 'hidden', textAlign: 'center'}}>
                    <ShowImage style={{Width: '100%'}} item={handyman} url="handyman"/>
                    <p>{handyman.rating} :рейтинг</p>
                    <p style={{textAlign: 'left'}}>{handyman.information}</p>

                </div>
            </div>
    )
}

export default CardMaster