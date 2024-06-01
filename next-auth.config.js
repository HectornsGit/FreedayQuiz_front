// export const authOptions = {
//     // Configuración de proveedores
//     providers: [
//         {
//             type: 'credentials',
//             async authorize({ email, password }) {
//                 try {
//                     const response = await fetch(
//                         'http://localhost:3001/login',
//                         {
//                             method: 'POST',
//                             body: JSON.stringify({ email, password }),
//                             headers: { 'Content-Type': 'application/json' },
//                         }
//                     )

//                     if (response.ok) {
//                         const userData = await response.json()
//                         return {
//                             user: {
//                                 id: userData.userId,
//                                 name: userData.name,
//                                 email: userData.email,
//                             },
//                         }
//                     } else {
//                         return null // Indica que la autenticación falló
//                     }
//                 } catch (error) {
//                     console.error('Error al autenticar:', error)
//                     return null // Indica que la autenticación falló
//                 }
//             },
//         },
//     ],

//     // Clave secreta
//     secret: 'miClaveSecreta', // Reemplaza con tu clave secreta real

//     // Callbacks
//     callbacks: {
//         signIn: async ({ user, email, password }) => {
//             // Código del callback de inicio de sesión
//             console.log('Usuario autenticado:', user)
//             // Puedes registrar la entrada del usuario en una base de datos o realizar otras acciones
//             return true
//         },
//     },
// }
