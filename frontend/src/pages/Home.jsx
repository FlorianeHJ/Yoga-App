import axios from 'axios'
import React, { useEffect, useState } from 'react'
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

    const [currentCard, setCurrentCard] = useState(0) // Change initial value to 0 for better handling
    const [isStarted, setIsStarted] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [favoriteIds, setFavoriteIds] = useState([])

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
        setCurrentCard(0) // Start from the first card
    }

    const handleTimerEnd = () => {
        setCurrentCard((prev) => {
            const nextCard = prev + 1 // Move to the next card
            if (nextCard < images.length) {
                return nextCard // If there is a next card, return it
            } else {
                setIsStarted(false) // Stop if it's the last card
                return prev // Keep current card if it's the last one
            }
        })
    }

    const handleDeleteCard = (id) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((card) => card.id !== id)

            // Adjust currentCard if the deleted card was currently displayed
            if (currentCard === id - 1) {
                setCurrentCard((prev) => Math.max(prev - 1, 0)) // Move to previous or stay at 0
            }

            // If all cards are deleted, reset
            if (updatedImages.length === 0) {
                setCurrentCard(0)
                setIsStarted(false) // Stop the timer
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

    return (
        <div>
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                handleLogout={handleLogout}
            />
            <div className="section">
                <h1 className="h1 py-7 text-center">Yoga Timer</h1>
                <p className="text-2xl text-center pb-16">
                    Personnalisez votre programme en supprimant les positions
                    que vous ne souhaitez pas effectuer, ajustez le timer et
                    c'est parti ! 🧘🏻‍♀️
                </p>
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
                            isActive={isStarted && currentCard === index} // Use index for comparison
                            handleToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>{' '}
                <div className="flex justify-center pt-24 pb-10">
                    <button
                        className="btn text-4xl px-16 py-5"
                        onClick={handleStart}
                        disabled={isStarted}
                    >
                        C'est parti !
                    </button>
                </div>
            </div>

            {isStarted && images.length > 0 && currentCard >= images.length && (
                <h2 className="text-center">C'est fini!</h2>
            )}
            <Footer />
        </div>
    )
}

export default Home
