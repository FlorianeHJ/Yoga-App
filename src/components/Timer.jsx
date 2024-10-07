import React, { useEffect, useState } from 'react'

const Timer = ({ initialMinutes, initialSeconds, onEnd }) => {
    const [minutes, setMinutes] = useState(initialMinutes)
    const [seconds, setSeconds] = useState(initialSeconds)

    useEffect(() => {
        setMinutes(initialMinutes)
        setSeconds(initialSeconds)
    }, [initialMinutes, initialSeconds])

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            onEnd()
            return // Arrête l'exécution si le timer est terminé
        }

        const intervalId = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(intervalId)
                } else {
                    setMinutes((prev) => prev - 1)
                    setSeconds(59) // Remets les secondes à 59
                }
            } else {
                setSeconds((prev) => prev - 1)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [minutes, seconds, onEnd])

    return (
        <div>
            <span>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
        </div>
    )
}

export default Timer
