import React, { useState } from 'react'
import Delete from './Delete'
import Timer from './Timer'

const Card = ({ img, onEnd, isActive }) => {
    // État pour gérer les minutes et secondes
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(0) // Initialiser à 0 secondes

    // Fonction pour changer le temps au clic
    const handleMinutesChange = (e) => {
        const newMinutes = Math.max(0, parseInt(e.target.value, 10) || 0)
        setMinutes(newMinutes)
        if (newMinutes > 0) setSeconds(0) // Remettre les secondes à 0 si les minutes changent
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
            className={`btn min-h-40 flex flex-col justify-between items-center px-8 py-10 ${
                isActive ? 'scale-110' : ''
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
                    <input
                        type="number"
                        value={minutes}
                        onChange={handleMinutesChange}
                        className="text-center w-16"
                        min="0"
                    />
                    <input
                        type="number"
                        value={seconds}
                        onChange={handleSecondsChange}
                        className="text-center w-16"
                        min="0"
                        max="59"
                    />
                </>
            )}
            <div className="w-40">
                <img src={img} alt="Exercices" />
            </div>
            <div>
                <Delete />
            </div>
        </div>
    )
}

export default Card
