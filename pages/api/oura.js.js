// pages/api/oura.js
import fetch from 'node-fetch';

async function getOuraData() {
    const apiKey = process.env.OURA_API_KEY;

    if (!apiKey) {
        throw new Error('Oura API key is not provided. Make sure to set the OURA_API_KEY environment variable.');
    }

    console.log('Fetching Oura data with API key:', apiKey);

    const response = await fetch('https://api.ouraring.com/v1/sleep', {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
    });

    if (!response.ok) {
        const errorMessage = `Error response from Oura API: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Fetched data from Oura API:', data);
    return data;
}

export default async function handler(req, res) {
    try {
        console.log('API request received');
        const ouraData = await getOuraData();
        console.log('Oura data fetched:', ouraData);
        res.status(200).json(ouraData);
    } catch (error) {
        console.error('Error fetching Oura data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
