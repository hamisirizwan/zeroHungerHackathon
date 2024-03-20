import React from 'react'
import './Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';



function Footer() {
  return (
    <div className='Footer'> 
    <div className="socialMedia">
            <InstagramIcon />
            <FacebookIcon />
            <XIcon />
            <EmailIcon />

        </div>
        <p> &copy; 2024 Zero-Hunger.com</p>


    </div>
  )
}

export default Footer