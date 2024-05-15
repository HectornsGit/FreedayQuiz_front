import { fetchAPI } from './fetch-api'

export async function sendRegister(payload) {
    return await fetchAPI('/register', 'post', payload)
}
