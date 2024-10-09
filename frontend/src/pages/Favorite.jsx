// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import Card from '../components/Card'

// const Favorite = () => {
//     const [favorites, setFavorites] = useState([])
//     const [isAuthenticated, setIsAuthenticated] = useState(false)

//     useEffect(() => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             setIsAuthenticated(true)
//             fetchFavorites(token)
//         }
//     }, [])

//     const fetchFavorites = async (token) => {
//         try {
//             const response = await axios.get('/api/favorite', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             })
//             setFavorites(response.data) // Supposons que la réponse contienne un tableau d'IDs de cartes favorites
//         } catch (error) {
//             console.error('Erreur lors de la récupération des favoris :', error)
//         }
//     }

//     return (
//         <div>
//             <h1 className="text-center">Mes Favoris</h1>
//             <div className="flex flex-1 flex-row flex-wrap justify-center gap-7">
//                 {favorites.map((favorite) => (
//                     <Card
//                         key={favorite.id}
//                         img={favorite.img} // Assure-toi que chaque favori a l'URL de l'image
//                         cardId={favorite.id}
//                         onDelete={() => {
//                             /* Implémente la logique de suppression si nécessaire */
//                         }}
//                         isActive={false} // Gérer selon tes besoins
//                         isStarted={false} // Gérer selon tes besoins
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Favorite
