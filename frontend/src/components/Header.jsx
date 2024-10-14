import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = ({ setIsLoggedIn }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setIsLoggedIn(false)
        navigate('/')
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
                    <>
                        <Link to="/signin">
                            <span className="cursor-pointer px-3 py-1 hover:bg-[#f6edea] rounded-lg">
                                Se connecter
                            </span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
