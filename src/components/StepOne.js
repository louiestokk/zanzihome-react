import React from 'react'
import { TextField } from '@material-ui/core'
const StepOne = ({setRenterEmail,setRenterName,setRenterNumber}) => {
  return (
    <div>
      <div style={{padding:'1rem'}}>
        <TextField onChange={(e)=>setRenterName(e.target.value)} style={{width:'100%'}} type='text' helperText='Your name' variant='outlined' placeholder='John Doe'/>
        <TextField onChange={(e)=> setRenterNumber(e.target.value)} style={{width:'100%',marginTop:'1rem'}}  type='text' helperText='Your phone number' variant='outlined' placeholder='+255 000 000 00'/>
        <TextField onChange={(e)=> setRenterEmail(e.target.value)} style={{width:'100%',marginTop:'1rem'}} type='email' helperText='Your email' variant='outlined' placeholder='your@email.com'/>
      </div>
    </div>
  )
}

export default StepOne