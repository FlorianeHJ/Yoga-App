import React, { useState } from 'react'
import { FaHeart, FaRegHeart, FaRegTrashAlt } from 'react-icons/fa'
import Timer from './Timer'

const Card = ({ img, onEnd, isActive, isStarted, onDelete }) => {
    const [isFavorite, setIsFavorite] = useState(false) // État pour savoir si la carte est en favori
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(0)

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
    const handleFavoriteToggle = () => {
        const token = localStorage.getItem('token') // Vérifier si l'utilisateur est authentifié
        if (!token) {
            alert('Vous devez être connecté pour ajouter un favori.')
            return
        }

        // Inverse l'état du favori
        setIsFavorite((prev) => !prev)

        // Logique pour envoyer l'info à l'API ou à MongoDB
        if (!isFavorite) {
            // Ajouter aux favoris dans la base de données
            console.log('Ajouter cette carte aux favoris')
            // Appel à l'API pour enregistrer le favori
        } else {
            // Supprimer des favoris
            console.log('Supprimer cette carte des favoris')
            // Appel à l'API pour supprimer des favoris
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
                        <div>
                            <button onClick={handleFavoriteToggle}>
                                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                            </button>
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
                    </div>
                </>
            )}
            <div className="w-40 py-2">
                <img src={img} alt="Exercices" />
            </div>
            <div>
                <button
                    onClick={onDelete}
                    className=" bg-[#efe4df] btn-delete py-3 px-5"
                >
                    <FaRegTrashAlt />
                </button>
            </div>
        </div>
    )
}

export default Card
