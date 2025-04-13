import React from 'react'

const LastStep = ({vehicle}) => {
  return (
    <div style={{width:'100%',textAlign:'center',padding:'1rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2 style={{margin:'1rem 0'}}>Your booking is confirmed.</h2>
        <p style={{width:'96%',textAlign:'center',lineHeight:'26px'}}>Thank you for your booking! We have emailed you information about your booking. We offer free delivery of the vehicle to your desired hotel or airport. Do not hesitate to contact our customer service who is there to help you.</p>
        <img src={vehicle?.[0]?.uri} title={vehicle?.[0]?.Title} loading='lazy' style={{objectFit:'cover',width:'220px',marginTop:'1rem',borderRadius:'5px'}}/>
    </div>
  )
}

export default LastStep