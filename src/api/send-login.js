//lamada a la API
import { fetchAPI } from './fetch-api'

export async function sendLogin(payload) {
    
    try {
    // Llamo a fetchAPI para recoger resultado (que es dónde está el token)
    const response = await fetchAPI('/login', 'post', payload);

    // Capturo token
    const token = response.data?.token; //¿en el resultado hay un token? pues dámelo :)

    //si tengo token, aprovecho y lo meto en localstorage
    if (token) {
        localStorage.setItem('token', token);
    }
    
    } catch (error) {
    console.error(error);
    }
}

