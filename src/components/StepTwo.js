import React from 'react'
import {useSelector} from 'react-redux'
import {getRentalData} from '../redux-toolkit/carRentalSlice'
const StepTwo = ({vehicle,antaldar,namn,nummer,hansemail}) => {
  const bokningsdata = useSelector(getRentalData)
  const formattedDate = bokningsdata?.rentFromDate.toLocaleDateString("en-US", {
    weekday: "short",  // "Thu"
    month: "short",    // "Apr"
    day: "2-digit",    // "17
    year: "numeric"    // "2025"
  });

  const formattedDateback = bokningsdata?.rentTodate.toLocaleDateString("en-US", {
    weekday: "short",  // "Thu"
    month: "short",    // "Apr"
    day: "2-digit",    // "17
    year: "numeric"    // "2025"
  });

  return (
    <div>
      <div style={{height:'30px'}}></div>
      <div>
        {vehicle.map((el,i)=>(
          <div key={el.adId} style={{display:'flex',justifyContent:'space-evenly'}}>
            <img style={{objectFit:'cover',height:'90px',width:'140px',borderRadius:'5px',boxShadow:'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}} src={el.uri} alt={el.Title}/>
            <div>
            <h5>{antaldar} days</h5>
              <p style={{marginBottom:'0.25rem'}}><strong>From:</strong> {formattedDate}</p>
              <p><strong>To:</strong> {formattedDateback}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:'1rem',textAlign:'center',marginTop:'1rem',boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
      <h3 style={{borderBottom:'1px solid lightgray',margin:'0.25rem 0'}}>Your details</h3>
        <p style={{margin:'0.25rem 0',letterSpacing:'1px'}}>{namn}</p>
        <p style={{margin:'0.25rem 0',letterSpacing:'1px'}}>{nummer}</p>
        <p style={{margin:'0.25rem 0',letterSpacing:'2px'}}>{hansemail}</p>
      </div>
    </div>
  )
}

export default StepTwo