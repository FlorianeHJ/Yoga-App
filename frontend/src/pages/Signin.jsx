import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Assure-toi d'importer useNavigate
import Footer from '../components/Footer'
import Header from '../components/Header'
import { API_ROUTES } from '../utils/constants' // Assure-toi que ce chemin est correct

const Signin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState({
        error: false,
        message: '',
    })

    // Fonction d'inscription
    const signUp = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(API_ROUTES.SIGN_UP, {
                username,
                password,
            })
            if (!response?.data) {
                console.log("Erreur lors de l'inscription: ", response)
                return
            }
            setNotification({
                error: false,
                message:
                    'Votre compte a bien été créé, vous pouvez vous connecter',
            })
        } catch (err) {
            setNotification({ error: true, message: err.message })
            console.log("Erreur lors de l'inscription: ", err)
        } finally {
            setIsLoading(false)
        }
    }

    // Fonction de connexion
    const signIn = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(API_ROUTES.SIGN_IN, {
                username,
                password,
            })
            if (!response?.data?.token) {
                setNotification({
                    error: true,
                    message: 'Une erreur est survenue lors de la connexion',
                })
                console.log('Erreur lors de la connexion: ', response)
            } else {
                // Stocke le token et les informations de l'utilisateur dans le stockage local ou context
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                navigate('/') // Redirige vers la page d'accueil ou le tableau de bord
            }
        } catch (err) {
            console.log(err)
            setNotification({ error: true, message: err.message })
            console.log('Erreur lors de la connexion: ', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Header />
            <div className="section">
                <div>
                    {notification.message && (
                        <div
                            className={`notification ${
                                notification.error ? 'error' : 'success'
                            }`}
                        >
                            {notification.message}
                        </div>
                    )}
                    <form
                        className="flex flex-col p-8 rounded-lg justify-center items-center gap-8 bg-secondary"
                        onSubmit={(e) => {
                            e.preventDefault()
                            signIn() // Ou signUp selon le bouton cliqué
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn p-2"
                            type="button"
                            onClick={signIn} // Bouton de connexion
                            disabled={isLoading}
                        >
                            {isLoading ? 'Connexion...' : 'Se connecter'}
                        </button>
                        <button
                            className="btn p-2"
                            type="button"
                            onClick={signUp} // Bouton d'inscription
                            disabled={isLoading}
                        >
                            {isLoading ? 'Inscription...' : "S'inscrire"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signin
