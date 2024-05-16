"use client";
import { useState } from "react";
import { sendRegister } from "@/api/send-register";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { name, email, password};
    console.log('Datos del formulario:', payload)

    // Enviar los datos del formulario al fetch
      sendRegister(payload)}

  return (
      <div>
          <form
              className="flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
          >
              <div className="flex flex-col items-center">
                  <label>Username:</label>
                  <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      required
                      className="rounded-lg min-w-64 min-h-7"
                  />
              </div>
              <div className="flex flex-col items-center mt-2">
                  <label>Email:</label>
                  <input
                      type="email"
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
                  Register
              </button>
          </form>
      </div>
  )
}

export default RegisterForm;
