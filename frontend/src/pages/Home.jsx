import React, { useState } from 'react'
import img1 from '../assets/0.png'
import img2 from '../assets/1.png'
import img3 from '../assets/2.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'
import img6 from '../assets/6.png'
import img7 from '../assets/7.png'
import img8 from '../assets/8.png'
import img9 from '../assets/9.png'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home = () => {
    const [images, setImages] = useState([
        { id: 1, img: img1 },
        { id: 2, img: img2 },
        { id: 3, img: img3 },
        { id: 4, img: img4 },
        { id: 5, img: img5 },
        { id: 6, img: img6 },
        { id: 7, img: img7 },
        { id: 8, img: img8 },
        { id: 9, img: img9 },
    ])
    const [currentCard, setCurrentCard] = useState(0)
    const [isStarted, setIsStarted] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

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

    const handleLogout = () => {
        setIsLoggedIn(false)
        // Ici tu peux aussi ajouter la déconnexion dans le backend, comme retirer le token
    }

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="section">
                <h1 className="h1 py-7 text-center">Yoga Timer</h1>
                <p className="text-2xl text-center pb-16">
                    Personnalisez votre programme en supprimant les positions
                    que vous ne souhaitez pas effectuer, ajuster le timer et
                    c'est parti ! 🧘🏻‍♀️
                </p>
                <div className="flex flex-1 flex-row flex-wrap justify-center gap-7">
                    {images.map((card) => (
                        <Card
                            key={card.id}
                            img={card.img}
                            cardId={card.id}
                            onEnd={handleTimerEnd}
                            onDelete={() => handleDeleteCard(card.id)} // Passe la fonction de suppression
                            isActive={isStarted && currentCard === card.id}
                            isStarted={isStarted}
                        />
                    ))}
                </div>
                <div className="flex justify-center pt-24 pb-10">
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
            <Footer />
        </div>
    )
}

export default Home
