import axios from "axios";

export default async function searchGames(req, res) {
  try {
    const payload = req.query.search;
    const filters = `name:${payload}`;
    const url = `https://www.giantbomb.com/api/games/?api_key=${process.env.NEXT_PUBLIC_GB_API_KEY}&filter=${filters}&limit=20&format=json`;
    const response = await axios.get(url);

    
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error("Error fetching data from Giant Bomb API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
