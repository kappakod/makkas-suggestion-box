import axios from 'axios';

export default async function authHandler(req, res) {
  try {
    // Make a request to the Twitch authentication endpoint
    const response = await axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

    // Return the authentication token from the Twitch response
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error proxying request to Twitch authentication endpoint:', error);
    res.status(error.response?.status || 500).json({ error: 'Internal server error' });
  }
}
