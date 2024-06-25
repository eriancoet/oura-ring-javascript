// pages/api/login.js
export default async function handler(req, res) {
    const clientId = process.env.OURA_CLIENT_ID;
    const redirectUri = process.env.OURA_REDIRECT_URI;
    const scopes = 'email personal daily heartrate workout tag session spo2Daily'; // Adjust scopes as needed

    const authorizeUrl = `https://cloud.ouraring.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;

    res.redirect(authorizeUrl);
}
