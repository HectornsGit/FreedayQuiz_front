const host = process.env.NEXT_PUBLIC_API_HOST

export async function fetchAPI(path, method, payload) {
    method = method ?? 'get'

    const requestInit = {
        method: method,
        headers: {},
    }

    if (method !== 'get' && method !== 'delete' && payload) {
        requestInit.headers['Content-Type'] = 'application/json'
        requestInit.body = JSON.stringify(payload)
    }

    const response = await fetch(host + path, requestInit)

    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
    }

    return result
}