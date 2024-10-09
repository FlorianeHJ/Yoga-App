import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaRegTrashAlt } from 'react-icons/fa'
import Timer from './Timer'

const Card = ({ img, onEnd, isActive, isStarted, onDelete, cardId }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(0)
    const [isAuthenticated, setIsAuthenticated] = useState(false) // État pour l'authentification

    // Vérification de l'authentification au chargement du composant
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
            checkIfFavorite(cardId, token)
        }
    }, [cardId])

    // Vérifier si la carte est déjà un favori
    const checkIfFavorite = async (cardId, token) => {
        try {
            const response = await axios.get(`/api/favorites/${cardId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setIsFavorite(response.data.isFavorite)
        } catch (error) {
            console.error('Erreur lors de la vérification du favori :', error)
        }
    }

    // Fonction pour gérer les minutes
    const handleMinutesChange = (e) => {
        const newMinutes = Math.max(0, parseInt(e.target.value, 10) || 0)
        setMinutes(newMinutes)
        if (newMinutes > 0) setSeconds(0)
    }

    // Fonction pour gérer les secondes
    const handleSecondsChange = (e) => {
        const newSeconds = Math.min(
            59,
            Math.max(0, parseInt(e.target.value, 10) || 0)
        )
        setSeconds(newSeconds)
    }

    // Fonction pour ajouter/enlever un favori
    const handleFavoriteToggle = async () => {
        if (!isAuthenticated) {
            alert('Vous devez être connecté pour ajouter un favori.')
            return
        }

        const token = localStorage.getItem('token')

        try {
            if (!isFavorite) {
                await axios.post(
                    '/api/favorite',
                    { cardId },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setIsFavorite(true)
                console.log('Carte ajoutée aux favoris')
            } else {
                await axios.delete(`/api/favorite/${cardId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setIsFavorite(false)
                console.log('Carte retirée des favoris')
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des favoris :', error)
        }
    }

    return (
        <div
            className={`bg-[#f6edea] min-h-40 flex flex-col justify-between items-center px-6 py-8 rounded-xl ${
                isStarted
                    ? isActive
                        ? 'scale-110 card-active'
                        : 'card-blur'
                    : ''
            }`}
        >
            {isActive ? (
                <Timer
                    initialMinutes={minutes}
                    initialSeconds={seconds}
                    onEnd={onEnd}
                />
            ) : (
                <>
                    <div>
                        {/* Rendre le bouton de favoris visible uniquement si l'utilisateur est authentifié */}
                        {isAuthenticated && (
                            <button onClick={handleFavoriteToggle}>
                                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                            </button>
                        )}
                    </div>
                    <div className="py-2">
                        <input
                            type="number"
                            value={minutes}
                            onChange={handleMinutesChange}
                            className="text-center w-10 bg-transparent"
                            min="0"
                            max="59"
                        />{' '}
                        <span>min</span>
                        <input
                            type="number"
                            value={seconds}
                            onChange={handleSecondsChange}
                            className="text-center w-10 bg-transparent"
                            min="0"
                            max="59"
                        />
                        <span>sec</span>
                    </div>
                </>
            )}
            <div className="w-40 py-2">
                <img src={img} alt="Exercice" />
            </div>
            <div>
                <button
                    onClick={onDelete}
                    className="bg-[#efe4df] btn-delete py-3 px-5"
                >
                    <FaRegTrashAlt />
                </button>
            </div>
        </div>
    )
}

export default Card
