import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme, TextField, Button } from '@mui/material';
import Header from '../../components/Header';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Reports = () => {
  const theme = useTheme();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const fetchData = () => {
    const requestData = {
      Date: selectedDate,
      Field: selectedField,
    };

    fetch('/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the data for the chart
        const labels = data.map((item) => item.Time).slice(0, 50); // Adjust the number of labels displayed
        const values = data.map((item) => item.Value).slice(0, 50); // Adjust the number of values displayed

        // Update the chart data state
        setChartData({
          labels: labels,
          datasets: [
            {
              label: selectedField,
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 1,
              pointRadius: 4,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    fetchData();
  };

  useEffect(() => {
    if (chartRef.current && chartData) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      // Find the minimum and maximum values in the data
      const values = chartData.datasets[0].data;
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: false,
              title: {
                display: true,
                text: 'Time',
              },
              ticks: {
                color: theme.palette.text.primary,
                maxRotation: 0, // Ensure the x-axis labels are not rotated
                minRotation: 0,
                maxTicksLimit: 10, // Adjust the maximum number of visible ticks
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Value',
              },
              min: minValue, // Set the minimum value of the y-axis to the minimum value in the data
              max: maxValue, // Set the maximum value of the y-axis to the maximum value in the data
              ticks: {
                color: theme.palette.text.primary,
                font: {
                  size: 14, // Adjust the font size of the y-axis ticks
                },
              },
            },
          },
          plugins: {
            title: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: theme.palette.background.paper,
              titleColor: theme.palette.text.primary,
              bodyColor: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
              borderWidth: 1,
              padding: 8,
              displayColors: false,
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
              },
            },
          },
        },
      });
    }
  }, [chartData, theme.palette]);

  return (
    <Box m="20px">
      <Header />

      <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <TextField
            label="Date"
            variant="outlined"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <TextField
            label="Field"
            variant="outlined"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          />

          <Button variant="contained" type="submit" sx={{ backgroundColor: '#bdbdbd', color: '#000' }}>
            Submit
          </Button>
        </Box>
      </form>

      <Box mt={4} display="flex" justifyContent="center">
        <canvas ref={chartRef} style={{ width: '100%', height: '500px' }} />
      </Box>
    </Box>
  );
};

export default Reports;
