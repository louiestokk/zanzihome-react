import axios from "axios";
export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data }
    } = await axios(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_TRAVEL
        }
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
