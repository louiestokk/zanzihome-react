"use client";

import React from 'react'
import {useSelector} from 'react-redux'
import {getRentalData} from '../redux-toolkit/carRentalSlice'

const StepTwo = ({vehicle,antaldar,namn,nummer,hansemail}) => {
  const bokningsdata = useSelector(getRentalData)
  
  const parseDate = (val) => {
    if (!val) return null;
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  };

  const rentFrom = parseDate(bokningsdata?.rentFromDate);
  const rentTo = parseDate(bokningsdata?.rentTodate);

  const formattedDate = rentFrom ? rentFrom.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric"
  }) : "";

  const formattedDateback = rentTo ? rentTo.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric"
  }) : "";

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
    </div>
  )
}

export default StepTwo