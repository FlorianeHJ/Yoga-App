import React from 'react'
import Delete from './Delete'

const Card = ({ img }) => {
    return (
        <div className=" btn min-h-40 flex flex-col justify-between  items-center px-8 py-10">
            <div>
                <span>Timer</span>
            </div>
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
