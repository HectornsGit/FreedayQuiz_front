//Esto es lo que tenia antes Javier para el login

import { fetchAPI } from './fetch-api'

export async function sendLogin(payload) {
    return await fetchAPI('/login', 'post', payload)
}