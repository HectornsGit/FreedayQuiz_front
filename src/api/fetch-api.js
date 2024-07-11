const host = process.env.NEXT_PUBLIC_API_HOST

export async function fetchAPI(
    path,
    method ='GET',
    payload = null,
    onSuccess = () => {},
    onError = () => {},
    additionalHeaders = {}
) {
    method = method ?? 'GET'

    const requestInit = {
        method: method,
        headers: { ...additionalHeaders },
    } 

    //LIDIA: elimino && method !== 'DELETE'de este if ya que para pegarle al endpoint de elminar preguntas necesito enviar body
    if (method !== 'GET' && payload) {
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