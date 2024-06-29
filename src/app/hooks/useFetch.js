/*para hacer fetch le tenemos que pasar 
path: que es la ruta por ejemplo: '/register' (cambiar /register por lo que toque)
data: es un objeto vacío que hay que construir con el método, el header (si fuera necesario) y el body (si fuera necesario)
onSuccess: qué queremos que se ejecute si hay éxito
onError: qué queremos que se ejecute si hay fallo
*/
const url = process.env.NEXT_PUBLIC_API_HOST;

export const useFetch = () =>{

  //tengo que haer otra funcion dentro para que pueda ser async
  const apiFetch = async (
    path = '',
    data = { },
    onSuccess = () => {},
    onError = () => {},
  )  =>  {
  
      try {
        const response = await fetch(url + path, data);
        const result = await response.json();

        if (response.ok) {
          onSuccess(result);
        } else {
          onError();
        }
      } catch (error) {
        onError(error);
      }
  
  }
  
  return { apiFetch };

}

export  default useFetch