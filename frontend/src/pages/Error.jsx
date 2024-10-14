import React from 'react'
import lost from '../assets/lost.png'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Error = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-col justify-center items-center text-center py-32 ">
                <h1 className="h1 text-8xl">Oops !</h1>
                <p className="py-5">
                    Vous avez n'avez pas méditer au bon endroit. Revenez à la
                    page d'accueil et bon yoga 🧘🏻‍♀️{' '}
                </p>
                <img
                    className="w-1/4"
                    src={lost}
                    alt="logo d'une personne perdue"
                />
            </div>
            <Footer />
        </div>
    )
}

export default Error
