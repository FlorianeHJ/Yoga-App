import React from 'react'
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
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9]

    return (
        <div className="section">
            <h1 className="h1 py-7 text-center">Yoga Timer</h1>
            <div className="flex flex-1 flex-row flex-wrap justify-between gap-7">
                {images.map((img) => (
                    <Card img={img} />
                ))}
            </div>
        </div>
    )
}

export default Home
