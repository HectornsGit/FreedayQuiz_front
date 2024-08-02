const host = process.env.NEXT_PUBLIC_API_HOST

export async function fetchAPI(
    path,
    method ='GET',
    payload = null,
    onSuccess = () => {},
    onError = () => {},
    additionalHeaders = {}
) {
    method = method ?? 'GET';

    const requestInit = {
        method: method,
        headers: { ...additionalHeaders },
    };

    //Javier: Añado manejo de Formdata
    if (method !== 'GET' && payload) {
        if (!(payload instanceof FormData)) {
            requestInit.headers['Content-Type'] = 'application/json';
            requestInit.body = JSON.stringify(payload);
        } else {
            requestInit.body = payload;
        }
    }

    try {
        const response = await fetch(host + path, requestInit);

        const result = await response.json();

        if (response.ok) {
            onSuccess(result);
        } else {
            onError(result);
        }
    } catch (error) {
        onError(error);
    }
}