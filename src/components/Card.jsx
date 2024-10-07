import React, { useState } from 'react'
import Timer from './Timer'

const Card = ({ img, onEnd, isActive, isStarted, onDelete }) => {
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(0)

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
            className={`btn min-h-40 flex flex-col justify-between items-center px-8 py-10 ${
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
                        <input
                            type="number"
                            value={minutes}
                            onChange={handleMinutesChange}
                            className="text-center w-10 bg-transparent"
                            min="0"
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
            <div className="w-40">
                <img src={img} alt="Exercices" />
            </div>
            <div>
                {/* Bouton Delete pour supprimer la carte */}
                <button onClick={onDelete} className="btn btn-delete">
                    Supprimer
                </button>
            </div>
        </div>
    )
}

export default Card
