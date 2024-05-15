import { useState } from "react";
import { sendLogin } from "@/api/send-login";

function LoginForm() {
  //const [loginInput, setLoginInput] = useState("");
  //const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };

  const handlePasswordChange = (e) => {
      setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
      e.preventDefault()

      const payload = { email, password }
      console.log('Datos del formulario:', payload)

      // Enviamos los datos del formulario al fetch
      sendLogin(payload)
          .then((response) => {
              console.log('Respuesta del servidor:', response)
              if (response.ok) {
                  console.log('Inicio de sesión exitoso')
              } else {
                  console.error('Error al iniciar sesión:', response.statusText)
              }
          })
          .catch((error) => {
              console.error(
                  'Error al procesar el inicio de sesión:',
                  error.message
              )
          })
  }

  return (
      <div>
          <form
              className="flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
          >
              <div className="flex flex-col items-center">
                  <label>Email:</label>
                  <input
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className="rounded-lg min-w-64 min-h-7"
                  />
              </div>
              <div className="flex flex-col items-center mt-2">
                  <label>Password:</label>
                  <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className="rounded-lg min-w-64 min-h-7"
                  />
              </div>

              <button
                  className="px-7 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-900 text-white justify-center items-center text-lg mt-5"
                  type="submit"
              >
                  Login
              </button>
          </form>
      </div>
  )
}

export default LoginForm;
