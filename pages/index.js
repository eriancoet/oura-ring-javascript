// pages/index.js
import OuraChart from '../components/OuraChart';

const Home = ({ ouraData }) => {
    return (
        <div>
            <h1>Oura Sleep Data</h1>
            {ouraData ? <OuraChart data={ouraData.sleep} /> : <p>No data available</p>}
        </div>
    );
};

export async function getServerSideProps() {
    try {
        const res = await fetch('http://localhost:3000/api/oura');
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const ouraData = await res.json();
        return { props: { ouraData } };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { props: { ouraData: null } }; // Handle error gracefully
    }
}

export default Home;
