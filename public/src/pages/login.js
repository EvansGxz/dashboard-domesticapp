import { useState } from "react";
import { useAuth } from "../context/auth-context";

function Login(){
  const { login } = useAuth();
  const [errors, setErrors] = useState(new Error());
  const [form, setForm] = useState({
      email: "",
      password: "",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }  

  function handleSubmit(event) {
    event.preventDefault();
    login(form).catch((error) => {
        setErrors(error);
    })
  }
  return(
    <>
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-rose-100 space-y-10 py-12 px-4 sm:px-6 lg:px-8">
        <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inicia sesion</h1>
        </div>
        <form className="max-w-md w-full mx-auto bg-white shadow rounded-lg p-7 space-y-6" action="" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-600 mb-1" htmlFor="email">Correo Electronico</label>
                <input className="border rounded-md bg-white px-3 py-2" onChange={handleFormChange} type="text" name="email" id="email" placeholder="Introduce tu email" />
            </div>
                <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-600 mb-1" htmlFor="password">Contraseña</label>
                <input className="border rounded-md bg-white px-3 py-2" onChange={handleFormChange} type="password" name="password" id="password" placeholder="Introduce tu contraseña" />
                {errors ? <label>{errors.message}</label> : null}
            </div>
            <div className="flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                    <input className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Recordarme</label>
                </div>
            </div>
            <div>
                <input type="submit" value="Inicia Sesión" className="w-full bg-blue-500 text-white rounded-md p-2"/>
            </div>
        </form>
    </main>
    </>
  )
}

export default Login;