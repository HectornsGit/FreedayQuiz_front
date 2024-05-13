"use client";
import { useState } from "react";

function LoginForm() {
  const [loginInput, setLoginInput] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginInputChange = (e) => {
    const inputValue = e.target.value;
    setLoginInput(inputValue);

    // Split the input value into username and email
    const [parsedUsername, parsedEmail] = inputValue.split("@");
    setUsername(parsedUsername);
    setEmail(parsedEmail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center">
          <label>Username / Email:</label>
          <input
            type="text"
            value={loginInput}
            onChange={handleLoginInputChange}
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
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
