import {API} from "../config"
import queryString from 'query-string'

export const getHandymans = sortBy => {
    return fetch(`${API}/handymans?sortBy=${sortBy}&order=desc&limit=3`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getMasters = sortBy => {
    return fetch(`${API}/handymans?sortBy=${sortBy}&order=desc&limit=0`, {
        method: "GET"
    })
    .then(response => { 
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API}/categories` , {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getFilteredHandymans = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }
    return fetch(`${API}/handymans/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const list = params => {
    const query = queryString.stringify(params)
    return fetch(`${API}/handymans/search?${query}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const read = (handymanId) => {
    return fetch(`${API}/handyman/${handymanId}`, {
        method: "GET"
    })
    .then(response => { 
        return response.json()
    })
    .catch(err => console.log(err))
}

