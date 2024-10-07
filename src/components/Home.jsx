import React, { useState } from 'react'
import { FaRedoAlt } from 'react-icons/fa'
import img1 from '../assets/0.png'
import img2 from '../assets/1.png'
import img3 from '../assets/2.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'
import img6 from '../assets/6.png'
import img7 from '../assets/7.png'
import img8 from '../assets/8.png'
import img9 from '../assets/9.png'
import Card from './Card'

const Home = () => {
    const [images, setImages] = useState([
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
    ])
    const [currentCard, setCurrentCard] = useState(0)
    const [isStarted, setIsStarted] = useState(false)

    const handleStart = () => {
        setIsStarted(true)
    }

    const handleTimerEnd = () => {
        setCurrentCard((prev) => prev + 1)
    }

    const handleDeleteCard = (index) => {
        // Supprime la carte à l'index donné du tableau d'images
        const newImages = images.filter((_, imgIndex) => imgIndex !== index)
        setImages(newImages)

        // Mettre à jour la carte active si elle a été supprimée
        if (currentCard >= newImages.length) {
            setCurrentCard(newImages.length - 1)
        }
    }

    return (
        <div className="section">
            <h1 className="h1 py-7 text-center">Yoga Timer</h1>
            <p className="text-2xl text-center pb-16">
                Personnalisez votre programme en supprimant les positions que
                vous ne souhaitez pas effectuer, ajuster le timer et c'est parti
                ! 🧘🏻‍♀️
            </p>
            <div className="flex flex-1 flex-row flex-wrap justify-center gap-7">
                {images.map((img, index) => (
                    <Card
                        key={index}
                        img={img}
                        onEnd={handleTimerEnd}
                        onDelete={() => handleDeleteCard(index)} // Passe la fonction de suppression
                        isActive={isStarted && currentCard === index}
                        isStarted={isStarted}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-9 justify-center pt-24 pb-10">
                {' '}
                <button className="btn">
                    <FaRedoAlt />
                </button>
                <button
                    className="btn text-4xl px-16 py-5"
                    onClick={handleStart}
                    disabled={isStarted}
                >
                    C'est parti !
                </button>
            </div>
            {currentCard >= images.length && isStarted && (
                <h2 className="text-center">C'est fini!</h2>
            )}
        </div>
    )
}

export default Home
