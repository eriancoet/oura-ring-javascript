// pages/oura.js
import OuraChart from '../components/OuraChart';

const Oura = ({ ouraData }) => {
    return (
        <div>
            <h1>Oura Sleep Data</h1>
            <OuraChart data={ouraData.sleep} />
        </div>
    );
};

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/oura');
    const ouraData = await res.json();
    return { props: { ouraData } };
}

export default Oura;
