import React from 'react'
import ContactCard from '../../components/ContactCard/ContactCard'
import Navbar from '../../components/Navbar/Navbar'
import "./Contact.css"
import KUSHAL from "../../assets/Kushal.jpeg"
import STUTI from "../../assets/Stuti.jpeg"

export default function Contact() {
    return (
        <div className='Contact'>
            <Navbar />
            <ContactCard name="Kushal Garg" phone="(+91)9582717169" email="kushalgarg2000@gmail.com" linkedin="https://linkedin.com/kushal-garg" image={KUSHAL}/>
            <ContactCard name="Stuti Prasad" phone="(+91)8310517130" email="stuti.prasad2k@gmail.com" linkedin="https://www.linkedin.com/in/stuti-prasad2k/" image={STUTI}/>
        </div>
    )
}
