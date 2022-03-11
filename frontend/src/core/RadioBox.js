import React, {useState, useEffect, Fragment} from "react";

const RadioBox = ({ratings, handleFilters}) => {
    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return ratings.map((p, i) => (
        <div  key={i}>
            <input onChange={handleChange} value={`${p._id}`} name={p} type="radio" className="mr-2 ml-4"/>
            <label className="form-check-label">{p.name} </label>
        </div>
    ))
}

export default RadioBox