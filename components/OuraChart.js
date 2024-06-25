// components/OuraChart.js
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const OuraChart = ({ data }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(entry => entry.summary_date),
                datasets: [{
                    label: 'Sleep Duration',
                    data: data.map(entry => entry.duration / 3600), // Convert seconds to hours
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours'
                        }
                    }
                }
            }
        });
    }, [data]);

    return <canvas ref={canvasRef} />;
};

export default OuraChart;
