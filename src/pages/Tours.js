import React, { useState } from "react";
import {Button} from '@material-ui/core'
import { Helmet } from "react-helmet-async";
import { BsStarFill } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { BsCalendar4Week } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import Faq from "../components/Faq";
const Tours = () => {

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Zanzibar Tours and Safaris: Explore the Beauty of Africa's Paradise",
    description:
      "Embark on an unforgettable journey with Zanzibar tours and safaris. Explore pristine beaches, encounter diverse wildlife, and immerse yourself in the enchanting culture",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/fe/13/eb.jpg",
    datePublished: new Date("2023-05-18T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };
  return (
    <div>
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {
            "Zanzibar Tours and Safaris: Explore the Beauty of Africa's Paradise"
          }
        </title>
        <meta
          name="description"
          content={
            "Embark on an unforgettable journey with Zanzibar tours and safaris. Explore pristine beaches, encounter diverse wildlife, and immerse yourself in the enchanting culture"
          }
        />
        <meta
          property="og:url"
          content="https://www.zanzihome.com/tours-zanzibar"
        />
        <meta
          property="og:description"
          content="Embark on an unforgettable journey with Zanzibar tours and safaris. Explore pristine beaches, encounter diverse wildlife, and immerse yourself in the enchanting culture"
        />
        <meta
          property="og:image"
          content="https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/fe/13/eb.jpg"
        />
        <link rel="canonical" href="https://www.zanzihome.com/tours-zanzibar" />
      </Helmet>
      <div id='toptoprated'>
      <div style={{textAlign:'center'}}>
      <h1 className={'titletoprated'}>Tours & Safari in Zanzibar</h1>
      <a style={{color:'inherit'}} href="https://huba-tours.com/" title="Huba Tours & Safari in Zanzibar">
        <img style={{objectFit:'cover',height:'100px'}} src="https://huba-tours.com/_next/image?url=https%3A%2F%2Fi.ibb.co%2F8DsN29v2%2Fhuba-tours-zanzibar.png&w=256&q=75"/>
      </a>
      {/* <h2 style={{marginLeft:'0.5rem',marginRight:'0.5rem',fontSize:'1.1rem',lineHeight:'30px'}}>Discover the Beauty of Zanzibar with <a style={{color:'inherit',textDecoration:'underline',fontWeight:'100'}} href="https://huba-tours.com/" title="Huba Tours & Safari Zanzibar">Huba Tours & Safari in Zanzibar</a> Exclusive Tours!</h2> */}
      <p style={{fontSize:'0.9rem',lineHeight:'23px',textAlign:'center',padding:'0.5rem',width:'90%',margin:'0 auto'}}>Explore  and <a style={{color:'inherit',textDecoration:'underline'}} href="https://huba-tours.com/" title="book tours & safari">book tours & safaris in Zanzibar</a>, exclusive and personalized safari and tour experiences with our <strong>partner</strong> <a style={{color:'inherit',textDecoration:'underline',fontWeight:'100'}} href="https://huba-tours.com/" title="Huba Tours & Safari Zanzibar">Huba Tours & Safari in Zanzibar</a>.</p>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',marginTop:'1rem'}}>
        {topratedsafar.map((el,i)=>(
          <div key={i} className={'toprateditem'}>
            <img loading='lazy' src={el.imgUrl} alt={el.title} className={'topratedImage'}/>
            <div style={{padding:'1rem'}}>
            <h4>{el.title}</h4>
            <div className={'topratedstarsCont'}>
            <article style={{margin:'0.5rem 0'}}>
            <BsStarFill className={'topratedstars'}/>
              <BsStarFill className={'topratedstars'}/>
              <BsStarFill className={'topratedstars'}/>
              <BsStarFill className={'topratedstars'}/>
              <BsStarFill className={'topratedstars'}/>
            </article>
            <p style={{marginLeft:'0.35rem',fontSize:'0.87rem'}}><strong>{el.reviews.stars}</strong>/5 -  {el.reviews.num} <a style={{textDecoration:'underline'}} href={'/reviews'}>Reviews</a></p>
            </div>
          <p style={{fontSize:'0.9rem',lineHeight:'24px',marginTop:'0.5rem',marginBottom:'1rem',color:'rgb(118, 116, 116)'}}>{el.desc}</p>
            <div>
              <article style={{display:'flex',alignItems:'center',margin:'0.75rem 0'}}>
                <BsCashCoin style={{fontSize:'1.4rem',marginRight:'0.6rem'}} className={'starIcon'}/>
                <p style={{fontSize:'0.88rem'}}><strong>Price</strong> USD ${el.price}</p>
              </article>
              <article style={{display:'flex',alignItems:'center'}}>
                <BsCalendar4Week style={{fontSize:'1.4rem',marginRight:'0.6rem'}} className={'starIcon'}/>
                <p style={{fontSize:'0.88rem'}}><strong>Best Time</strong> {el.bestTime}</p>
              </article>
              <article style={{display:'flex',alignItems:'center',margin:'0.75rem 0'}}>
                <BsClock style={{fontSize:'1.4rem',marginRight:'0.6rem'}} className={'starIcon'}/>
                <p style={{fontSize:'0.88rem'}}><strong>High Season</strong> {el.highSeason}</p>
              </article>
            </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',margin:'1rem 0'}}>
            <a href={el.path} title={el.title}>
            <Button style={{width:'280px',color:'#00BF93',border:'0.5px solid #00BF93',padding:'0.5rem'}} variant='outlined'>Explore tour <BsArrowRightShort style={{marginLeft:'1rem'}}/>
            </Button>
           </a>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  
    <div style={{display:'flex',justifyContent:'center',margin:'1rem 0'}}>
      <a style={{color:'inherit',textDecoration:'underline',fontWeight:'bold'}} href="https://huba-tours.com/" title="Tours & Safari in Zanzibar">Explore more tours</a>
    </div>
    <div style={{height:'50px'}}></div>
    <Faq data={faqToursSafari} />
    <div style={{height:'15px'}}></div>
    <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
      <h2 className="poppins" style={{ maxWidth: "85%", margin: "1rem auto" }}>
        Discover the Best Tours & Safaris in Zanzibar and Tanzania
      </h2>
      <p
        className="sans"
        style={{
          maxWidth: "90%",
          margin: "0rem auto",
          lineHeight: "25px",
          color: "black"
        }}
      >
        Welcome to ZanziHome Adventures, your ultimate gateway to unforgettable experiences in Zanzibar and Tanzania! Whether you dream of exploring the historic streets of Stone Town, diving into the crystal-clear waters of Mnemba Atoll, or embarking on a thrilling safari through the Serengeti, we have the perfect adventure for you.
        
        Our platform offers a handpicked selection of the best tours and safaris, designed to showcase the beauty, culture, and wildlife of this extraordinary region. Experience the magic of the Spice Tour, the wonder of Jozani Forest, and the breathtaking sights of Ngorongoro Crater. Looking for something truly unique? Witness the Great Migration or take a hot air balloon safari over the Serengeti!
        
        We prioritize high-quality service, expert local guides, and seamless bookings to ensure a stress-free adventure. Whether you're a solo traveler, a couple, or a family, we provide customized tour packages that fit every interest and budget. Explore, discover, and experience the best of Zanzibar and Tanzania with ZanziAdventures!
      </p>

      <div style={{ margin: "2rem 0" }}>
        <h2 className="best-airmax-text">Highly Rated</h2>
        <p>
          Based on <strong> 1540 reviews</strong>
        </p>
        <img
          src="https://www.snijpunt.com/files/thumbnails/trustpilot-logo-snijpunt.1600x680x1.png"
          alt="trustpilot"
          style={{ height: "120px", width: "300px", objectFit: "cover" }}
        />
      </div>
    </div>


    </div>
  );
};

export default Tours;

const topratedsafar = [
  {
    id:'1001',
    identifyer:'Safari Blue Zanzibar',
    duration:'4 hours',
    type:'WATER ACTIVITY',
    title:'Safari Blue Zanzibar, Blue horizon experience with lunch',
    subTitle:'Safari Blue Zanzibar, Blue horizon experience with lunch',
    desc:'Safari Blue trip is a full day tour along Menai bay, which is one of the best coralreefs in Zanzibar. Main activities in the tour includes visit to naturally occurring sandbanks, Swimming & Snorkeling in the crystal clear waters, visiting Kwale island with its natural green lagoon and Climbing the old Baobab tree for spectacular view of the Island.',
    desched:'Safari Blue Zanzibar -  Boat Trip and Snorkling Adventure with Lunch',
    path:'https://huba-tours.com/tours/zanzibar/safari-blue-menai-bay',
    subdesc:'Explore the Mnemba conservation area by snorkeling around the vibrant coral reef. See a variety of colorful fish and swim with dolphins on this fascinating boat trip departing from Kendwa.',
    price:'75',
    reviews:{
      num:'241',
      stars:'4.8'
    },
    bestTime:'September to Mars',
    highSeason:'Oktober to Februari',
    imgUrl:'https://i.ibb.co/Ps4cVRYh/safari-blue-zanzibar.jpg',
    city:'Zanzibar, Tanzania',
    location:'Zanzibar, Tanzania',
    imagesArray:['https://i.ibb.co/Ps4cVRYh/safari-blue-zanzibar.jpg','https://i.ibb.co/WNtNrgNz/ocean-safari-zanzibar.jpg', 'https://i.ibb.co/yBB2s57V/safari-blue-zanzibar-new.jpg','https://images.pexels.com/photos/3041869/pexels-photo-3041869.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/28584677/pexels-photo-28584677/free-photo-of-dykare-som-utforskar-det-livliga-korallrevet.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load' ,'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2','https://images.pexels.com/photos/13010777/pexels-photo-13010777.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load']
  },
  {
    id:'1002',
    identifyer:'Nakupenda Sandbank',
    type:'WATER ACTIVITY',
    title:'Nakupenda Sandbank, Snorkeling & Grilled lunch with fresh seafood',
    subTitle:'Nakupenda Sandbank, Snorkeling & Grilled Lunch',
    duration:'6 hours',
    desc:'Nakupenda Sandbank is located just off Stone Town. Around 20 minutes local boat riding from Stone Town. Once on the sandbank, you will be provided with snorkeling equipment such as masks for Snorkeling purposes. The underwater world at Nakupenda Sandbank is unbelievably spectacular. There are countless colorful fishes and other sea creatures.',
    desched:'From Stone Town to Nakupenda Sandbank Boat Trip and Snorkling Adventure',
    subdesc:'Explore the Nakupenda area by snorkeling around the vibrant coral reef. See a variety of colorful fish and swim with dolphins on this fascinating boat trip.',
    path:'https://huba-tours.com/tours/zanzibar/nakuependa-sandbank',
    price:'50',
    reviews:{
      num:'211',
      stars:'4.9'
    },
    bestTime:'September to Mars',
    highSeason:'Oktober to Februari',
    imgUrl:'https://i.ibb.co/QjdFkbfC/nakupenda-sandbank-zanzibar.webp',
        city:'Nakupenda Sandbank',
        location:'Nakupenda Sandbank',
        imagesArray:['https://i.ibb.co/QjdFkbfC/nakupenda-sandbank-zanzibar.webp','https://i.ibb.co/1NYYB2k/Nakupenda-Beach-Zanzibar.jpg', 'https://i.ibb.co/1f7Vc2Pb/nakunpenda-sandbank.jpg', 'https://i.ibb.co/dFWc20P/turtle-island-zanzibar.jpg','https://images.pexels.com/photos/3041869/pexels-photo-3041869.jpeg?auto=compress&cs=tinysrgb&w=800' ,'https://www.zanzibar-tours.co.tz/wp-content/uploads/2024/12/prison-island-and-sand-bank-tour-nakupenda-safari_cE1KL-636x426.jpg','https://i.ibb.co/jvwZsWj7/huba-tours-nakupenda-tours.jpg']
  },
  {
    id:'1003',
    identifyer:'Mnemba Island',
    title:'Zanzibar: Dolphin and Snorkeling Tour at Mnemba Island with Lunch',
    subTitle:'Dolphin and Snorkeling Tour at Mnemba Island with Lunch',
    duration:'5 hours',
    type:'WATER ACTIVITY',
    subdesc:'Explore the Mnemba conservation area by snorkeling around the vibrant coral reef. See a variety of colorful fish and swim with dolphins on this fascinating boat trip departing from Kendwa.',
    desc:'Mnemba Dolphins & Snorkeling Tour is an exciting trip that we designed for your best holiday experience in the paradise islands of Zanzibar. In this tour, you will start with swimming with wild dolphins, and then to Snorkeling in the shallow water near Mnemba Island. Explore this best snorkeling spot in Zanzibar with us by speedboat from Kigomani beach at Matemwe,',
    desched:'From Stone Town to Kamzikazi Boat Trip and Snorkling Adventure',
    path:'https://huba-tours.com/tours/zanzibar/mnemba-dolphin-snorkling',
    price:'55',
    reviews:{
      num:'323',
      stars:'4.8'
    },
    bestTime:'September to Mars',
    highSeason:'Oktober to Februari',
    imgUrl:'https://i.ibb.co/fV1cLNPS/snorkeling-mneba.jpg',
    city:'Mnemba Island',
    location:'Mnemba Island',
    imagesArray:['https://i.ibb.co/fV1cLNPS/snorkeling-mneba.jpg' ,'https://i.ibb.co/xyQ2WzZ/zanzibar-snorkelling.jpg' ,'https://i.ibb.co/3yG9nBcj/mnemba-island.jpg','https://i.ibb.co/TDJBWJfb/dolphin-tour-with-snorkeling-at-mnemba-island-zanzibar-l-ZEh-N.jpg','https://i.ibb.co/TDJBWJfb/dolphin-tour-with-snorkeling-at-mnemba-island-zanzibar-l-ZEh-N.jpg']
  },
  {
    id:'1201',
    duration:'4 hours',
    identifyer:'Stone Town Walking Tour',
    type:'WALKING ACTIVITY',
      title:'Stone Town Walking Tour with Guide',
      path:'https://huba-tours.com/tours/zanzibar/stone-town',
      imgUrl:'https://i.ibb.co/1t614B9f/stone-town-zanzibar.jpg',
        desc:'Discover the fascinating history and culture of Stone Town on a guided walking tour. Explore the narrow streets and visit the Anglican Cathedral, the House of Wonders, and the Palace Museum. Explore the food and restaurant as the market for fruit, spice, seafood and shopping areas. Discover how to buy fresh groceries daily and where to find the best coffe to drink. Stone Town offer a night life with bars and restaurants.',
        subdesc:'Stone town is UNESCO wold heritage site is history culture and religion influences exploring wild of ther street icons market sultans palece house of wonderland and Elizabeth tower in night market like as jubilee of woman also is meating point.',
        desched:'Stone Town Walking Tour, Fruit, Spice, Historical and Street Food with Guide',
        location:'Stone Town, Zanzibar',
        reviews:{
          num:'328',
          stars:'4.7'
        },
        bestTime:'Maj to Mars',
        highSeason:'December to Februari',
        subTitle:'Stone Town Walking Tour, Fruit, Spice and Stree Food',
        price:'20',
        city:'Stone Town, Zanzibar',
            imagesArray:['https://images.pexels.com/photos/7101641/pexels-photo-7101641.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://i.ibb.co/7JQY0vcM/Stonetown-market.jpg' ,'https://images.pexels.com/photos/24247143/pexels-photo-24247143/free-photo-of-gaende-byggnader-kvinnor-grand.jpeg?auto=compress&cs=tinysrgb&w=800','https://images.pexels.com/photos/29889222/pexels-photo-29889222/free-photo-of-fisk-och-skaldjursupplevelse-pa-zanzibar.jpeg?auto=compress&cs=tinysrgb&w=1200','https://images.pexels.com/photos/29889176/pexels-photo-29889176/free-photo-of-senior-par-promenerar-pa-zanzibar-beach.jpeg?auto=compress&cs=tinysrgb&w=1200']
  },
  {
    id:'1301',
    identifyer:'Spice Tour',
    duration:'4 hours',
    type:'WALKING ACTIVITY',
      title:'From Stone Town: Spice Tour of Zanzibar with Guide',
      path:'https://huba-tours.com/tours/zanzibar/spice-tours',
      imgUrl:'https://i.ibb.co/ZRbW1Mqj/Zanzibar-Spice-Tour.jpg',
        desc:'Discover spice plants, herbs, and all kinds tropical fruits on a small spice plantation. Learn why Zanzibar is known as "spice island" and buy spices to take home with you.Learn what herbs and spices were originally used for, Explore the magic of the coconut climber Discover and taste some fresh tropical fruits. ',
        subdesc:'Discover spice plants, herbs, and all kinds tropical fruits on a small spice plantation. Learn why Zanzibar is known as "spice island" and buy spices to take home with you.Learn what herbs and spices were originally used for',
        desched:'Discover spice plants, herbs, and all kinds tropical fruits on a spice plantation',
        location:'Stone Town, Zanzibar',
        reviews:{
          num:'225',
          stars:'4.8'
        },
        bestTime:'Maj to Mars',
        highSeason:'Maj to Januari',
        subTitle:'From Stone Town: Spice Tour of Zanzibar with Guide',
        price:'25',
        city:'Stone Town, Zanzibar',
            imagesArray:['https://i.ibb.co/ZRbW1Mqj/Zanzibar-Spice-Tour.jpg', 'https://i.ibb.co/bjPdmhKR/full-day-private-tour-in-zanzibar-with-cooking-class-FLQ7m.jpg' ,'https://i.ibb.co/fz6XMyK9/spice-tours-hubatours.webp','https://i.ibb.co/k2bHqXjh/spices-zanzibar.jpg','https://i.ibb.co/RTRx2XRy/tours-spice-tours.jpg']
  },
  {
    id:'1041',
    identifyer:'Jozani Forest',
    duration:'4 hours',
    type:'WALKING ACTIVITY',
      title:'Zanzibar: Jozani Forest National Park Nature Walk and Wildlife',
      path:'https://huba-tours.com/tours/zanzibar/jozani-forest',
      imgUrl:'https://i.ibb.co/FLmPcnfV/jozani-forest-zanzibar.png',
        desc:'Explore Jozani Forest like a Zanzibar insider! Well skip the crowds and find the coolest red colobus monkeys, secret trails, and hidden wonders. Jozani Forest is the largest area of indigenous forest on Zanzibar Island. On our Jozani Forest tour, youll get a chance to explore and play with red colobus monkeys.',
        subdesc:'Explore Jozani Forest like a Zanzibar insider! Well skip the crowds and find the coolest red colobus monkeys, secret trails, and hidden wonders. Jozani Forest is the largest area of indigenous forest on Zanzibar Island.',
        desched:'Jozani National Park Nature Walk and Wildlife Tour',
        location:'East, Zanzibar',
        reviews:{
          num:'198',
          stars:'4.9'
        },
        bestTime:'June to Feb',
        highSeason:'July to Januari',
        subTitle:'Zanzibar: Jozani National Park Nature Walk and Wildlife Tour',
        price:'50',
        city:'East Zanzibar',
        imagesArray:['https://i.ibb.co/FLmPcnfV/jozani-forest-zanzibar.png', 'https://i.ibb.co/Xx3ztxY8/monkeys-jozani.jpg' ,'https://i.ibb.co/KxFGz678/jozani-forest-huba.jpg','https://i.ibb.co/rGxDbMQn/zanzibar-jozani-monkey.jpg','https://i.ibb.co/NdjPqGn6/jungle-Jozani-forest.jpg']
  },
  {
    id:'1241',
    identifyer:'Deep Sea Fishing',
    duration:'6 hours',
    type:'WATER ACTIVITY',
      title:'Deep Sea Fishing in Latham Island Zanzibar with MotorBoat',
      path:'https://huba-tours.com/tours/zanzibar/deep-sea-fishing',
      imgUrl:'https://i.ibb.co/21vr1636/deep-sea-fisihing-zanzibar.jpg',
        desc:'DEEP SEA Fishing in Latham Island Zanzibar under water on half day exploring coral reef swiming among color of deferent fish book now for camping and netur of beautiful in nectur. Get your biggest fish in Zanzibar and view the amazing sea. We have all you ned to get your fish and cool off and snorkel to view all different fishes.',
        subdesc:'DEEP SEA Fishing in Latham Island Zanzibar under water on half day exploring coral reef swiming among color of deferent fish book now for camping and netur of beautiful in nectur. Get your biggest fish in Zanzibar',
        desched:'Deep Sea Fishing in Latham Island Zanzibar with MotorBoat',
        location:'Latham Island',
        reviews:{
          num:'182',
          stars:'4.8'
        },
        bestTime:'June to Feb',
        highSeason:'August to Januari',
        subTitle:'Deep Sea Fishing in Latham Island Zanzibar with MotorBoat',
        price:'105',
        city:'Latham Island',
        imagesArray:['https://i.ibb.co/21vr1636/deep-sea-fisihing-zanzibar.jpg', 'https://i.ibb.co/PzC25g0s/Deep-sea-fishing-huba-tours.jpg' ,'https://i.ibb.co/Swb7pRhV/fishing-in-zanzibar.jpg','https://i.ibb.co/mVD5vmC1/Zanzibar-fishing-tour.jpg','https://i.ibb.co/yFMTTCqn/Fising-Zanzibar.webp']
  },
  {
    id:'1288',
    identifyer:'Spice Tour',
    duration:'7 hours',
    type:'ACTIVITY',
      title:'Zanzibar: Stone Town, Spice Tour and Prison Island Day Trip',
      path:'https://huba-tours.com/tours/zanzibar/prison-island-day-trip',
      imgUrl:'https://i.ibb.co/TxpBXLNW/turtle-prison-island-zanzibar.jpg',
        desc:'Stone Town & Prison Island – A Must-See Zanzibar Tour Explore the historic Stone Town, a UNESCO-listed gem filled with rich culture, vibrant markets, and stunning architecture. Learn why Zanzibar is called the "Spice Island" as you visit a spice farm and experience the island’s famous aromas. Then, set sail for Prison Island.',
        subdesc:'Discover Stone Town & Prison Island – A Must-See Zanzibar Tour Explore the historic Stone Town, a UNESCO-listed gem filled with rich culture, vibrant markets, and stunning architecture.',
        desched:'Zanzibar: Stone Town, Spice Tour and Prison Island Day Trip',
        location:'Zanzibar Island',
        reviews:{
          num:'447',
          stars:'4.9'
        },
        bestTime:'Okt to Feb',
        highSeason:'August to Januari',
        subTitle:'Zanzibar: Stone Town, Spice Tour and Prison Island Day Trip',
        price:'60',
        city:'Zanzibar Island',
        imagesArray:['https://i.ibb.co/TxpBXLNW/turtle-prison-island-zanzibar.jpg', 'https://i.ibb.co/1t614B9f/stone-town-zanzibar.jpg' ,'https://i.ibb.co/cKbb85wZ/prison-island.jpg','https://i.ibb.co/RkFYwSWx/spice-tour-zanzibar.jpg','https://i.ibb.co/75ZS9YH/tea-zanzibar.jpg']
  },
  {
    id:'2002',
    identifyer:'Skydiving over Zanzibar',
    duration:'3 hours',
    type:'SKYDIVE ACTIVITY',
      title:'Skydiving over Zanzibar - Tandem Skydiving',
      path:'https://huba-tours.com/tours/zanzibar/skydiving-zanzibar',
      imgUrl:'https://i.ibb.co/TBpYQhLM/Ska-rmavbild-2025-03-04-kl-20-33-09.png',
        desc:'Discover Zanzibar from a whole new perspective and feel the adrenaline rush with a tandem skydiving experience! Before takeoff, a professional instructor will provide a thorough briefing to ensure you are fully prepared for a safe and unforgettable jump. As soon as you land, you’ll receive free photos and videos of your experience, allowing you to relive the thrill for years to come.',
        subdesc:'Discover Zanzibar from a whole new perspective and feel the adrenaline rush with a tandem skydiving experience! Before takeoff, a professional instructor will provide a thorough briefing to ensure you are fully prepared for a safe and unforgettable jump.',
        desched:'Skydiving over Zanzibar - Tandem Skydiving',
        location:'Zanzibar Island',
        reviews:{
          num:'393',
          stars:'4.8'
        },
        bestTime:'Maj to Feb',
        highSeason:'August to December',
        subTitle:'Skydiving over Zanzibar - Tandem Skydiving',
        price:'520',
        city:'Zanzibar Island',
        imagesArray:['https://i.ibb.co/TBpYQhLM/Ska-rmavbild-2025-03-04-kl-20-33-09.png', 'https://i.ibb.co/1G4wLChj/huba-tours-skydiving.png' ,'https://i.ibb.co/d0jcW4sT/skydive-zanzibar.jpg','https://i.ibb.co/1GThShKW/skydiving-in-zanzibar.jpg','https://images.pexels.com/photos/1556664/pexels-photo-1556664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2']
  },
  {
    id:'2001',
    identifyer:'Tradition Cooking Lesson',
    duration:'3 hours',
    type:'COOKING ACTIVITY',
      title:'Tradition Cooking Lesson - Spice Farm & Fruit Garden',
      path:'https://huba-tours.com/tours/zanzibar/cooking-spice-farm-zanzibar',
      imgUrl:'https://i.ibb.co/DFrY5hN/cooking-swahili-food.jpg',
        desc:'Discover the vibrant world of Zanzibar’s spice farms on an immersive and sensory-rich adventure. Walk through lush plantations where exotic spices thrive, and engage your senses as you see, touch, and inhale the fragrant aromas of freshly grown cloves, cinnamon, vanilla, nutmeg, and more. Then, elevate your experience with an authentic Swahili cooking lesson, where you’ll learn to prepare flavorful local dishes using freshly harvested ingredients. ',
        subdesc:'Discover the vibrant world of Zanzibar’s spice farms on an immersive and sensory-rich adventure. Walk through lush plantations where exotic spices thrive, and engage your senses as you see, touch, and inhale the fragrant aromas of freshly grown spices.',
        desched:'Tradition Cooking Lesson - Spice Farm & Fruit Garden',
        location:'Stone Town, Zanzibar',
        reviews:{
          num:'534',
          stars:'4.9'
        },
        bestTime:'Maj to Januari',
        highSeason:'August to December',
        subTitle:'Tradition Cooking Lesson - Spice Farm & Fruit Garden',
        price:'40',
        city:'Stone Town, Zanzibar',
        imagesArray:['https://i.ibb.co/DFrY5hN/cooking-swahili-food.jpg', 'https://i.ibb.co/8n6qJQqk/traditional-cooking-zanzibar.jpg' ,'https://i.ibb.co/v6mQwT2W/traditional-cooking-zanzibar-wa.jpg','https://i.ibb.co/60JZ8CYv/cooking-food-stone-town.jpg','https://i.ibb.co/7N86JYYv/spices-zannizbar.jpg']
  },
  {
    id:'2001',
    identifyer:'Blue Lagoon Snorkeling',
    duration:'4 hours',
    type:'SNORKELING ACTIVITY',
      title:'Blue Lagoon Snorkeling Trip Zanzibar',
      path:'https://huba-tours.com/tours/zanzibar/blue-lagoon-snorkeling',
      imgUrl:'https://i.ibb.co/pjyT2mfR/blue-lagoon-huba-tours.jpg',
        desc:'Nestled along Zanzibar’s stunning coastline, Blue Lagoon is a true tropical paradise, renowned for its crystal-clear waters that shimmer in mesmerizing shades of blue and turquoise. The tranquil lagoon is set against a backdrop of soft, powdery white sand and swaying palm trees, creating an idyllic escape for nature lovers and adventure seekers alike. What makes Blue Lagoon truly special is its natural coral reef barrier, which protects the waters from strong ocean currents.',
        subdesc:'Nestled along Zanzibar’s stunning coastline, Blue Lagoon is a true tropical paradise, renowned for its crystal-clear waters that shimmer in mesmerizing shades of blue and turquoise. The tranquil lagoon is set against a backdrop of soft, powdery white sand and swaying palm trees.',
        desched:'Blue Lagoon Snorkeling Trip Zanzibar',
        location:'Zanzibar, Tanzania',
        reviews:{
          num:'234',
          stars:'4.8'
        },
        bestTime:'Jun to Januari',
        highSeason:'August to December',
        subTitle:'Blue Lagoon Snorkeling Trip Zanzibar',
        price:'45',
        city:'Zanzibar, Tanzania',
        imagesArray:['https://i.ibb.co/pjyT2mfR/blue-lagoon-huba-tours.jpg', 'https://i.ibb.co/pBGb9cgH/dr-snorkel.jpg' ,'https://i.ibb.co/gZZk4qJG/lagoon-blue.gif','https://i.ibb.co/JwW0rq0J/best-snorkeling-zanzibar.jpg','https://i.ibb.co/B2qttGZq/blue-blue-lagoon.jpg']
  },
  {
    id:'2001',
    identifyer:'Kayak Mangroves Adventure',
    duration:'3 hours',
    type:'WATER ACTIVITY',
      title:'Kayak Tour Mangroves of Michamvi - Kayaking Adventure',
      path:'https://huba-tours.com/tours/zanzibar/kayak-mangroves-michamvi',
      imgUrl:'https://i.ibb.co/BdffV34/kayak-adventure-zanzibar.jpg',
        desc:'Explore the serene beauty of Michamvi, Zanzibar, on our Mangrove Kayak Tour. Paddle through lush mangrove forests, guided by experts who share insights into this unique ecosystem. Spot diverse wildlife, including exotic birds and marine life, while learning about the local culture. The tour lasts about 3 hours, with departures based on tide schedules. We provide kayaks, safety gear, a professional guide, and refreshments.',
        subdesc:'Explore the serene beauty of Michamvi, Zanzibar, on our Mangrove Kayak Tour. Paddle through lush mangrove forests, guided by experts who share insights into this unique ecosystem. Spot diverse wildlife, including exotic birds and marine life, while learning about the local culture',
        desched:'Kayak Tour Mangroves of Michamvi - Kayaking Adventure',
        location:'Michamvi, Zanzibar',
        reviews:{
          num:'248',
          stars:'4.8'
        },
        bestTime:'Jun to Mars',
        highSeason:'August to December',
        subTitle:'Kayak Tour Mangroves of Michamvi - Kayaking Adventure',
        price:'40',
        city:'Michamvi, Zanzibar',
        imagesArray:['https://i.ibb.co/RRX6nLn/kayak-mangroves-michamvi-zanzibar.jpg', 'https://i.ibb.co/BdffV34/kayak-adventure-zanzibar.jpg' ,'https://i.ibb.co/p6VwMRKq/zanzibar-kayak.jpg','https://i.ibb.co/TB9Qqj3H/Kayaking-in-Zanzibar.jpg','https://i.ibb.co/8nmZcJJJ/zanzibar-kayak-huba-tours.jpg']
  },
  {
    id:'2011',
    identifyer:'Salaam Cave Turtles',
    duration:'4 hours',
    type:'WATER ACTIVITY',
      title:'Salaam Cave Swimming With Sea Turtles In Kizimkazi',
      path:'https://huba-tours.com/tours/zanzibar/salaam-cave-kizimkazi',
      imgUrl:'https://i.ibb.co/xt1SZJgC/salaam-cave-swimming-with-sea-turles-in-kizimkazi.jpg',
        desc:'Discover the magic of Salaam Cave in Kizimkazi, where you can swim alongside sea turtles in crystal-clear waters. This unique experience lets you observe and feed these gentle creatures while learning about local conservation efforts. The tour includes hotel pickup, entrance fees, a professional guide, and seaweed for feeding. Lasting about 4 hours, it offers a serene and unforgettable encounter with nature. Just bring your swimwear, towel, sunscreen, and a waterproof camera to capture the moment!',
        subdesc:'Discover the magic of Salaam Cave in Kizimkazi, where you can swim alongside sea turtles in crystal-clear waters. This unique experience lets you observe and feed these gentle creatures while learning about local conservation efforts.',
        desched:'Salaam Cave Swimming With Sea Turtles In Kizimkazi',
        location:'Kizimkazi Zanzibar',
        reviews:{
          num:'118',
          stars:'4.8'
        },
        bestTime:'July to Feb',
        highSeason:'August to December',
        subTitle:'Salaam Cave Swimming With Sea Turtles In Kizimkazi',
        price:'60',
        city:'KIZIMKAZI ZANZIBAR',
        imagesArray:['https://i.ibb.co/xt1SZJgC/salaam-cave-swimming-with-sea-turles-in-kizimkazi.jpg', 'https://i.ibb.co/tTcTCQV5/salaam-cave-zanzibar.jpg' ,'https://i.ibb.co/LdFSB0mQ/salaam-cave-swimming-huba.jpg','https://i.ibb.co/whFKrdV4/cave-salaam-tours.jpg','https://i.ibb.co/84c2ZGZc/turtles-swimming-zanzibar.webp']
  },
  {
    id:'2012',
    identifyer:'Mnemba Island, Kuza Cave, Salaam Cave & The Rock',
    duration:'9 hours',
    type:'WATER ACTIVITY',
      title:'Mnemba Island with Lunch, Kuza Cave, Salaam Cave & The Rock',
      path:'https://huba-tours.com/tours/zanzibar/mnemba-kuza-salaam-the-rock',
      imgUrl:'https://i.ibb.co/Vc91rp8c/Mnemba-Island-Tanzania.jpg',
        desc:'Embark on a 3-hour snorkeling tour at Mnemba Island Atoll, Zanzibar, a marine reserve teeming with lionfish, moray eels, stingrays, and turtles. Swim alongside sea turtles and visit Salaam Cave at Kizimkazi Beach to interact with these creatures and explore limestone formations. End your day with a romantic 2-hour sunset dinner at The Rocks Restaurant near Michamvi Pingwe. Enjoy African traditional music, a glass of sparkling wine, and a delicious 3-course meal of seafood or Swahili specialties while admiring the breathtaking ocean view.',
        subdesc:'Embark on a 3-hour snorkeling tour at Mnemba Island Atoll, Zanzibar, a marine reserve teeming with lionfish, moray eels, stingrays, and turtles. Swim alongside sea turtles and visit Salaam Cave at Kizimkazi Beach to interact with these creatures and explore limestone formations. End your day with a romantic 2-hour sunset dinner at The Rocks Restaurant near Michamvi Pingwe. Enjoy African traditional music, a glass of sparkling wine, and a delicious 3-course meal of seafood or Swahili specialties while admiring the breathtaking ocean view.',
        desched:'Mnemba Island with Lunch, Kuza Cave, Salaam Cave & The Rock',
        location:'Zanzibar Island',
        reviews:{
          num:'224',
          stars:'4.9'
        },
        bestTime:'Jun to Feb',
        highSeason:'August to December',
        subTitle:'Mnemba Island with Lunch, Kuza Cave, Salaam Cave & The Rock',
        price:'140',
        city:'Zanzibar Island',
        imagesArray:['https://i.ibb.co/Vc91rp8c/Mnemba-Island-Tanzania.jpg', 'https://i.ibb.co/Psw8pFBL/kuza-cave-jambiani-huba.jpg' ,'https://i.ibb.co/LdFSB0mQ/salaam-cave-swimming-huba.jpg','https://i.ibb.co/Z65MtZTD/the-rock-zanzibar.jpg','https://i.ibb.co/hRhzyW3h/grilled-seafood-bbq.webp']
  }
]

export const faqToursSafari = [
  {
    title: "What are the best tours to do in Zanzibar?",
    text: "Zanzibar offers a variety of exciting tours that showcase its rich history, culture, and natural beauty. Some of the most popular tours include:\n- **Stone Town Tour** – Discover the history, architecture, and vibrant culture of Zanzibar’s UNESCO-listed old town.\n- **Spice Tour** – Visit local spice farms and learn about the island’s famous spices such as cloves, cinnamon, and vanilla.\n- **Prison Island Tour** – Meet the giant tortoises and enjoy snorkeling in crystal-clear waters.\n- **Dolphin Tour** – Swim with dolphins in their natural habitat off the coast of Kizimkazi.\n- **Jozani Forest Tour** – Explore Zanzibar’s only national park and see the rare Red Colobus Monkeys.\n- **Safari Blue Tour** – A full-day adventure including snorkeling, dhow sailing, and seafood feasts on remote sandbanks."
  },
  {
    title: "What are the best safaris in Tanzania?",
    text: "Tanzania is home to some of the world's most spectacular safaris. Top safari destinations include:\n- **Serengeti National Park** – Witness the Great Migration, where millions of wildebeest and zebras travel across the plains.\n- **Ngorongoro Crater** – A UNESCO World Heritage site with incredible wildlife viewing inside a massive volcanic caldera.\n- **Tarangire National Park** – Famous for large elephant herds and breathtaking baobab trees.\n- **Lake Manyara National Park** – Known for tree-climbing lions and diverse birdlife.\n- **Selous Game Reserve** – One of Africa’s largest game reserves, perfect for boat safaris and walking safaris.\n- **Ruaha National Park** – A remote safari experience with fewer tourists and diverse wildlife."
  },
  {
    title: "What is the best time to go on a safari in Tanzania?",
    text: "The best time for a safari in Tanzania depends on what you want to see:\n- **June to October** (Dry Season) – Best time for general wildlife viewing, as animals gather around water sources.\n- **January to February** – Great time to witness the calving season in the Serengeti.\n- **March to May** (Rainy Season) – Fewer tourists and lush landscapes, but some roads may be difficult to access.\n- **July to September** – Best time to witness the Great Migration river crossings in the Serengeti."
  },
  {
    title: "How much does a safari in Tanzania cost?",
    text: "Safari prices vary based on duration, accommodation, and parks visited:\n- **Budget Safari** – Starts from $150-$250 per person per day (camping or budget lodges).\n- **Mid-Range Safari** – Costs around $300-$600 per person per day (comfortable lodges and tented camps).\n- **Luxury Safari** – Ranges from $700-$2,500+ per person per day (luxury lodges and private tours).\n- **Private vs. Group Safaris** – Private safaris are more expensive but offer a customized experience, while group safaris are more affordable and great for solo travelers."
  },
  {
    title: "Can I combine a Zanzibar holiday with a Tanzania safari?",
    text: "Absolutely! Many travelers combine a thrilling wildlife safari in Tanzania with a relaxing beach holiday in Zanzibar. Popular safari and beach combinations include:\n- **Serengeti + Zanzibar** – Experience the Great Migration, then relax on Zanzibar’s beaches.\n- **Ngorongoro Crater + Zanzibar** – Explore a natural wildlife wonder before unwinding in paradise.\n- **Southern Tanzania (Selous & Ruaha) + Zanzibar** – A quieter, off-the-beaten-path safari experience followed by a tropical getaway.\nFlights between mainland Tanzania (Arusha or Dar es Salaam) and Zanzibar take only about 1-2 hours, making the combination easy and convenient."
  },
  {
    title: "What should I pack for a safari in Tanzania?",
    text: "For a comfortable safari, pack:\n- **Clothing**: Light, breathable fabrics in neutral colors, long sleeves for sun and insect protection, and a warm jacket for chilly mornings.\n- **Footwear**: Comfortable walking shoes or hiking boots.\n- **Accessories**: Hat, sunglasses, sunscreen, and insect repellent.\n- **Gear**: Binoculars, camera with extra batteries, and a flashlight.\n- **Documents**: Passport, visa, travel insurance, and necessary vaccinations (Yellow Fever certificate if required)."
  }
];
