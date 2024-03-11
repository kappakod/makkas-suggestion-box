import axios from "axios";

export default async function gameslistHandler(req, res) {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", ""); // Remove 'Bearer ' prefix
    const payload = req.query.search;
    console.log("payload", payload);
    const response = await axios.get(
      "https://api.igdb.com/v4/games",{
        params: {
          search: payload,
          fields: "artworks.url,name,cover.url,summary,first_release_date,involved_companies.company.name,platforms.name",
        },
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from IGDB API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
