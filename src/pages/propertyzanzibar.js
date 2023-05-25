import React from "react";
import { Helmet } from "react-helmet-async";
import BannerSection from "../components/BannerSection";
import NewFilter from "../components/newfilter/NewFilter";
import CategoryImageIcons from "../components/CategoryImageIcons";
import Popular from "../components/Popular";

const propertyzanzibar = () => {
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Discover Properties or Rent a Vehicle in Zanzibar ",
    description:
      "Discover Properties in Zanzibar. Browse our listings for rental and sale properties, and explore the island with ease by renting a vehicle from us.",
    image:
      "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    datePublished: new Date("2023-04-04T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };
  return (
    <>
      <div>
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Discover Properties or Rent a Vehicle in Zanzibar "}</title>
        <meta
          name="description"
          content={
            "Discover Properties in Zanzibar. Browse our listings for rental and sale properties, and explore the island with ease by renting a vehicle from us."
          }
        />
        <meta property="og:url" content="https://zanzihome.com" />
        <meta
          property="og:description"
          content="Discover Properties in Zanzibar. Browse our listings for rental and sale properties, and explore the island with ease by renting a vehicle from us."
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      </Helmet>
      <NewFilter />
      <CategoryImageIcons />
      <BannerSection />
      {/* <Popular
        title={"Popular Tours & Safaris"}
        images={[
          {
            url: "https://imgs.mongabay.com/wp-content/uploads/sites/20/2019/05/17064151/ZanzibarRedColobus_JozaniTanzania_HasinShakurWikicommonsGFDL1.2-768x512.jpg",
            imgText: "Jozani Forest"
          },
          {
            url: "https://tuliazanzibar.com/wp-content/uploads/2019/09/IMG_0698.jpg",
            imgText: "Prison Island"
          },
          {
            url: "https://zantrips.com/uploads/package_banner/111574160139.jpg",
            imgText: "Dolphin Tour"
          },
          {
            url: "https://www.focuseastafricatours.com/wp-content/uploads/zanzibar-spice1.jpg",
            imgText: "Spice Tour"
          }
        ]}
      /> */}
      <Popular
        title={"Featured Vehicle"}
        images={[
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FWhiteRush%20(1).JPG?alt=media&token=db1a9f40-acec-4144-82c1-5fe7d56e0bdf",
            imgText: "Toyota Rush",
            id: "x9WjYlJbF3aHwbcvJiFM",
            type: "Vehicle"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F4.1-Honda-XL-250-671X333.jpg?alt=media&token=c4d707cd-593d-4a83-a107-4f43c4931045",
            imgText: "Honda XL 250cc",
            id: "tIIZIHH4XnnMGRXF5oiD",
            type: "Vehicle"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FToyota-rav4-900x600.jpeg?alt=media&token=1e6981c1-e140-4343-820d-b22391c38648",
            imgText: "Toyota Rav4",
            id: "OtStER3Ja1mBOa8PVK8W",
            type: "Vehicle"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Frent%20scooter%20zanzibar.jpg?alt=media&token=3205b51f-ddc4-4d64-828b-fb4037694b1b",
            imgText: "Honda Click 125",
            id: "E5GvnkSLGD6sNeWicgip",
            type: "Vehicle"
          }
        ]}
      />
      <Popular
        title={"Featured Properties"}
        images={[
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F44E71F23-2098-4D81-B2E4-116345638B9E.jpeg?alt=media&token=7714cb00-23b7-4f23-bdb1-98bcef7ecf53",
            imgText: "Beach front plot in Kidoti",
            adId: Number(624688142),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fmichamvi.jpg?alt=media&token=5d8e4bb0-d3e7-4253-97c0-0ee2133bf4b6",
            imgText: "Big Beach Plot Michamvi",
            adId: Number(801410),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FFE741E1B-C0CF-46D2-B772-162CF9A28BBD.jpeg?alt=media&token=6144208c-93ee-46ab-9449-658234545b22",
            imgText: "Hotel for rent Paje",
            adId: Number(382045),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fyhouse2.jpg?alt=media&token=4b06691f-8afd-418f-bce7-f972cc5143a5",
            imgText: "Villa for rent Paje",
            adId: Number(338429),
            type: "Properties"
          }
        ]}
      />
    </>
  );
};

export default propertyzanzibar;
