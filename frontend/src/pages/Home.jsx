import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRotateLeft } from 'react-icons/fa6'
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
    // Stockage initial des cartes
    const initialImages = [
        { id: 1, img: img1 },
        { id: 2, img: img2 },
        { id: 3, img: img3 },
        { id: 4, img: img4 },
        { id: 5, img: img5 },
        { id: 6, img: img6 },
        { id: 7, img: img7 },
        { id: 8, img: img8 },
        { id: 9, img: img9 },
    ]

    const [images, setImages] = useState(initialImages)
    const [currentCard, setCurrentCard] = useState(0)
    const [isStarted, setIsStarted] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [favoriteIds, setFavoriteIds] = useState([])
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
            fetchFavorites(token)
        }
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            setFavoriteIds([])
        }
    }, [isLoggedIn])

    const fetchFavorites = async (token) => {
        try {
            const response = await axios.get(
                'http://localhost:4000/api/favorite',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            setFavoriteIds(response.data.map((favorite) => favorite.cardId))
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des favoris :',
                error.response?.data?.message || error.message
            )
        }
    }

    const handleStart = () => {
        setIsStarted(true)
        setCurrentCard(0)
        setIsFinished(false)
    }

    const handleTimerEnd = () => {
        setCurrentCard((prev) => {
            const nextCard = prev + 1
            if (nextCard < images.length) {
                return nextCard
            } else {
                setIsStarted(false)
                setIsFinished(true)
                return prev
            }
        })
    }

    const handleDeleteCard = (id) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((card) => card.id !== id)

            if (currentCard === id - 1) {
                setCurrentCard((prev) => Math.max(prev - 1, 0))
            }

            if (updatedImages.length === 0) {
                setCurrentCard(0)
                setIsStarted(false)
            }

            return updatedImages
        })
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
    }

    const handleToggleFavorite = async (cardId, isFavorite) => {
        const token = localStorage.getItem('token')
        try {
            if (isFavorite) {
                await axios.delete(
                    `http://localhost:4000/api/favorite/${cardId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
            } else {
                await axios.post(
                    'http://localhost:4000/api/favorite',
                    { cardId },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
            }
            setFavoriteIds((prevIds) => {
                if (isFavorite) {
                    return prevIds.filter((id) => id !== cardId)
                } else {
                    return [...prevIds, cardId]
                }
            })
        } catch (error) {
            console.error(
                'Erreur lors de la mise à jour des favoris :',
                error.response?.data?.message || error.message
            )
        }
    }

    const handleReset = () => {
        // Réinitialiser les cartes et minuteurs
        setImages(initialImages) // Remet toutes les cartes
        setCurrentCard(0) // Remet l'index de la carte à 0
        setIsStarted(false) // Arrête le timer
        setIsFinished(false) // Indique que la session n'est pas finie
    }

    return (
        <div>
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                handleLogout={handleLogout}
            />
            <div className="section">
                <h1 className="h1 py-7 text-center">Yoga Timer</h1>
                {isFinished ? (
                    <h2 className="text-center">C'est fini!</h2>
                ) : (
                    <>
                        {isLoggedIn ? (
                            <p className="text-2xl text-center pb-16">
                                Personnalisez votre routine ! Choisissez vos
                                positions favorites, supprimez celles qui ne
                                vous inspirent pas et modifiez le compte à
                                rebours. Vous êtes prêts ? Alors cliquez sur
                                "C'est parti", et bonne session ! 🧘🏻‍♀️
                            </p>
                        ) : (
                            <p className="text-2xl text-center pb-16">
                                Vous avez besoin d'une pause ? Yoga Timer est
                                parfait pour mettre en place une routine
                                bien-être. Connectez-vous pour avoir accès au
                                timer et à la personnalisation de votre routine
                                ! 🧘🏻‍♀️
                            </p>
                        )}
                        <div className="flex flex-1 flex-row flex-wrap justify-center gap-7">
                            {images.map((card, index) => (
                                <Card
                                    key={card.id}
                                    id={card.id}
                                    card={card}
                                    img={card.img}
                                    currentCard={currentCard}
                                    handleDeleteCard={handleDeleteCard}
                                    onEnd={handleTimerEnd}
                                    isStarted={isStarted}
                                    handleStart={handleStart}
                                    isLoggedIn={isLoggedIn}
                                    isFavorite={favoriteIds.includes(
                                        card.id.toString()
                                    )}
                                    isActive={
                                        isStarted && currentCard === index
                                    }
                                    onToggleFavorite={handleToggleFavorite}
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
                    </>
                )}
                <div className="flex justify-center ">
                    <button
                        className="btn p-4 rounded-xl "
                        onClick={handleReset}
                    >
                        <FaRotateLeft />
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home
