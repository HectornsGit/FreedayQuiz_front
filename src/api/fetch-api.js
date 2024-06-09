const host = process.env.NEXT_PUBLIC_API_HOST


export async function fetchAPI(
    path,
    method,
    payload,
    onSuccess = () => {},
    onError = () => {}
) {
    method = method ?? 'get'

    const requestInit = {
        method: method,
        headers: {}, 
    }

    if (method !== 'get' && method !== 'delete' && payload) {
        requestInit.headers['Content-Type'] = 'application/json'
        requestInit.body = JSON.stringify(payload)
    }
    try {
        const response = await fetch(host + path, requestInit)

        const result = await response.json()

        if (response.ok) {
            onSuccess(result)
        } else {
            onError(result)
        }
    } catch (error) {
        onError(error)
    }
}
