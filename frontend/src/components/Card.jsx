import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaRegTrashAlt } from 'react-icons/fa'
import { API_ROUTES } from '../utils/constants'
import Timer from './Timer'

const Card = ({ img, onEnd, isActive, isStarted, onDelete, cardId }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(0)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true)
        }
    }, [token])

    const handleFavoriteToggle = async () => {
        if (!isAuthenticated) {
            alert('Vous devez être connecté pour ajouter un favori.')
            return
        }

        try {
            if (!isFavorite) {
                // Ajouter la carte aux favoris
                await axios.post(
                    API_ROUTES.FAVORITE_ADD,
                    { cardId },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                setIsFavorite(true)
            } else {
                // Retirer la carte des favoris
                await axios.delete(API_ROUTES.FAVORITE_DELETE(cardId), {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setIsFavorite(false)
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des favoris :', error)
        }
    }

    const handleMinutesChange = (e) => {
        const newMinutes = Math.max(0, parseInt(e.target.value, 10) || 0)
        setMinutes(newMinutes)
        if (newMinutes > 0) setSeconds(0)
    }

    const handleSecondsChange = (e) => {
        const newSeconds = Math.min(
            59,
            Math.max(0, parseInt(e.target.value, 10) || 0)
        )
        setSeconds(newSeconds)
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
                        {isAuthenticated && (
                            <button onClick={handleFavoriteToggle}>
                                {isFavorite ? (
                                    <FaHeart className="text-red-500" />
                                ) : (
                                    <FaRegHeart />
                                )}
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
