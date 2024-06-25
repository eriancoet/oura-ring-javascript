// pages/api/callback.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { code } = req.query;
    const clientId = process.env.OURA_CLIENT_ID;
    const clientSecret = process.env.OURA_CLIENT_SECRET;
    const redirectUri = process.env.OURA_REDIRECT_URI;

    const tokenResponse = await fetch('https://api.ouraring.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
        }),
    });

    if (!tokenResponse.ok) {
        const errorMessage = `Error response from Oura API: ${tokenResponse.status} ${tokenResponse.statusText}`;
        console.error(errorMessage);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    const tokenData = await tokenResponse.json();
    console.log('Token Data:', tokenData);

    // Save the tokenData.access_token to your database or session here

    res.status(200).json({ tokenData });
}
