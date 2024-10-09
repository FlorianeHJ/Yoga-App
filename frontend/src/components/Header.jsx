import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token') // Vérifie s'il y a un token

    const handleLogout = () => {
        localStorage.removeItem('token') // Supprime le token
        localStorage.removeItem('userId') // Supprime l'ID utilisateur
        navigate('/') // Redirige vers la page d'accueil après déconnexion
    }

    return (
        <div className="p-5 text-xl flex justify-end flex-row gap-4">
            <div className="w-4/5">
                <Link to="/">
                    <img className="w-14" src={logo} alt="Logo du site" />
                </Link>
            </div>

            <div>
                {token ? (
                    // Si le token existe, on affiche les boutons "Mes Favoris" et "Déconnexion"
                    <>
                        <Link to="/favorite">
                            <span className="cursor-pointer px-3 py-1 hover:bg-[#f6edea] rounded-lg">
                                Mes Favoris
                            </span>
                        </Link>
                        <span
                            className="cursor-pointer px-3 py-1 hover:bg-[#f6edea] rounded-lg"
                            onClick={handleLogout}
                        >
                            Déconnexion
                        </span>
                    </>
                ) : (
                    // Sinon, on affiche les boutons "Se connecter" et "Inscription"
                    <>
                        <Link to="/signin">
                            <span className="cursor-pointer px-3 py-1 hover:bg-[#f6edea] rounded-lg">
                                Se connecter
                            </span>
                        </Link>
                        <Link to="/signup">
                            <span className="cursor-pointer px-3 py-1 hover:bg-[#f6edea] rounded-lg">
                                Inscription
                            </span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
