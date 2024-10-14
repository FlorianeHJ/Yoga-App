import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { API_ROUTES } from '../utils/constants'

const Signin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
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
                email,
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
                email,
                password,
            })
            if (!response?.data?.token) {
                setNotification({
                    error: true,
                    message: 'Une erreur est survenue lors de la connexion',
                })
                console.log('Erreur lors de la connexion: ', response)
            } else {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                navigate('/')
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
                <div className="flex flex-col justify-center items-center py-10">
                    <h2 className="text-4xl pb-5 text-center">
                        Connectez-vous pour démarrer la session 🧘🏻‍♀️
                    </h2>
                    <p className="text-xl">
                        Vous n'avez pas encore de compte ? Inscrivez vous !
                    </p>
                </div>
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
                            e.preventDefault() // Empêche le comportement par défaut du formulaire
                        }}
                    >
                        <input
                            className="py-2 px-4"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="py-2 px-4"
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn py-2 px-4"
                            type="button"
                            onClick={signIn} // Bouton de connexion
                            disabled={isLoading}
                        >
                            {isLoading ? 'Connexion...' : 'Se connecter'}
                        </button>
                        <button
                            className="btn py-2 px-4"
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
