import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart, FaRegTrashAlt } from 'react-icons/fa'
import Timer from './Timer'

const Card = ({
    img,
    name,
    onEnd,
    isActive,
    isStarted,
    handleDeleteCard,
    card,
    isFavorite: isFavoriteProp,
    onToggleFavorite,
}) => {
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(0)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isFavorite, setIsFavorite] = useState(isFavoriteProp)
    const token = localStorage.getItem('token')

    useEffect(() => {
        setIsAuthenticated(!!token)
    }, [token])

    useEffect(() => {
        setIsFavorite(isFavoriteProp)
    }, [isFavoriteProp])

    const handleFavoriteToggle = async () => {
        if (!isAuthenticated) {
            alert('Vous devez être connecté pour ajouter un favori.')
            return
        }

        await onToggleFavorite(card.id, isFavorite)

        setIsFavorite(!isFavorite)
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
            {isAuthenticated && isActive ? (
                <Timer
                    initialMinutes={minutes}
                    initialSeconds={seconds}
                    onEnd={onEnd}
                />
            ) : (
                <>
                    <div className="flex w-full justify-between items-center pb-7">
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
                        {isAuthenticated && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteCard(card.id)
                                }}
                                className="btn-delete"
                            >
                                <FaRegTrashAlt />
                            </button>
                        )}
                    </div>
                    {isAuthenticated && (
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
                    )}
                </>
            )}
            <div className="w-40 py-2">
                <img src={img} alt="Exercice" />
            </div>
            <div className="flex justify-center">
                <span>{name}</span>
            </div>
        </div>
    )
}

export default Card
