//lamada a la API
import { fetchAPI } from './fetch-api'

export async function sendLogin(payload) {
    //return await fetchAPI('/login', 'post', payload)

    try {
    // Llamo a fetchAPI para recoger resultado (que es dónde está el token)
    const response = await fetchAPI('/login', 'post', payload);

    // Capturo token
    const token = response.data?.token; 

    //si tengo token, aprovecho y lo meto en localstorage
    if (token) {
        localStorage.setItem('token', token);
    }
    
    } catch (error) {
    console.error(error);
    }

    
}

