"use client";
import { useState } from "react";
import { sendRegister } from "@/api/send-register";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construir el payload con los datos del formulario
    const payload = {
      username: username,
      email: email,
      password: password,
    };

    (async () => {
      try {
        // Llamar a sendRegister con el payload
        const response = await sendRegister(payload);
        // Manejar la respuesta si es necesario
        console.log("Registro exitoso:", response);}
        catch (error) {
        // Manejar errores si la solicitud falla
        console.error("Error al registrar:", error);}
    })();
  };

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="rounded-lg min-w-64 min-h-7"
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg min-w-64 min-h-7"
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
  );
}

export default RegisterForm;
