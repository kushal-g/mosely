import React from 'react'
import "./ContactCard.css"
export default function ContactCard({name,phone,email,linkedin,image}) {
    
    function calculateHueRotate() {
        let rotation = 7
        for (let i = 0; i < name.length; i++){
            rotation*=name.charCodeAt(i)
        }
        return rotation % 360
    }
    console.log(calculateHueRotate())
    return (
        <div className='ContactCard'>
            <img src={image} alt={`${name}-profile`} style={{filter:`sepia(100%) saturate(200%) brightness(70%) hue-rotate(${calculateHueRotate()}deg)`}}
            
            />
            <div>
                <div className='contact-name'>{name}</div>
                <a className='contact-phone' href={`tel:${phone}`}>{phone}</a>
                <a className='contact-email' href={`mailto:${email}`}>{email}</a>
                <a className='contact-linkedin' href={linkedin}>{linkedin}</a>
            </div>
            
        </div>
    )
}
