import React from "react";
import {API} from '../config'

const ShowImage = ({item, url}) => (
    <div className="product-img">
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3" style={{height: '360px', width: '420px'}}>
        </img>
    </div>
)

export default ShowImage