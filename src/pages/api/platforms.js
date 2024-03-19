import axios from "axios";

export default async function getPlatforms(req, res) {
  try {
    const url = `https://www.giantbomb.com/api/platforms/?api_key=${process.env.NEXT_PUBLIC_GB_API_KEY}`;
    const response = await axios.get(url);

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error("Error fetching platform data from Giant Bomb API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
