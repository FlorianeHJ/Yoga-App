import React from 'react'
import { FaGithub, FaLinkedin, FaMailBulk } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <div className="flex text-center pb-2 px-4">
                <p className="text-sm italic">
                    Ce site est conçu pour la détente et le bien-être.
                    Assurez-vous de consulter un professionnel de santé si vous
                    avez des doutes sur votre pratique. N'oubliez pas de bien
                    vous hydrater, de manger équilibré, et surtout, ne forcez
                    jamais vos limites. Prenez soin de vous ! 🧘‍♀️{' '}
                </p>
            </div>
            <div className=" absolute  bg-[#efe4df]/80 backdrop-blur-2xl w-full">
                <p className="text-lg p-2 flex flex-row align-center items-center text-center justify-center gap-5">
                    © 2024 Created with 🩵 by{' '}
                    <span>
                        <a
                            target="_blank"
                            href="https://www.linkedin.com/in/floriane-hurtebize-03218b119/"
                        >
                            Floriane HJ
                        </a>
                    </span>{' '}
                    <span className="italic">
                        <a href="#">Mentions légales</a>
                    </span>
                    <a
                        className="text-[22px]"
                        target="_blank"
                        href="https://www.linkedin.com/in/floriane-hurtebize-03218b119/"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        className="text-[22px]"
                        target="_blank"
                        href="https://github.com/FlorianeHJ"
                    >
                        <FaGithub />
                    </a>
                    <a
                        className="text-[22px]"
                        target="_blank"
                        href="mailto:fjulia.dev@gmail.com"
                    >
                        <FaMailBulk />
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer
