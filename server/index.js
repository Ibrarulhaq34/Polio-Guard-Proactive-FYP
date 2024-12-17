const express = require('express');
const app = express();
const env = require('dotenv'); 
const cors = require('cors'); 
const db = require('./db');
const router = require('./routes/mapRoute');


const router2 = require('./routes/inventory');
const router1 = require('./routes/supplier');

const adminRoutes = require('./routes/adminRoutes');
const teamLeadRoutes = require('./routes/teamLeadRoutes');
const clientRoutes = require('./routes/clientRoutes');
const workerRoutes = require('./routes/workerRoutes');
const clientPost = require('./routes/clientPost');


const alerts = require('./routes/alerts');

const post = require('./routes/postRoutes');

const fs = require('fs');
const csv = require('csv-parser');


env.config();
db

const port = process.env.PORT || 2000 

app.use(express.json());
app.use(cors())

const path = require('path');

// Serve images from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api',router2)
app.use('/api',router1)



app.use('/api/admin', adminRoutes);
app.use('/api/teamlead', teamLeadRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/worker', workerRoutes);

app.use('/api',router)

app.use('/api/posts', post)

app.use('/api/clientPost', clientPost);

app.use('/api/alerts', alerts);

app.get('/api/data', (req, res) => {
    const results = [];
    fs.createReadStream('polio_cases_with_coordinates.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname, 'polio_heatmap_pakistan.html'));
});

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})

let data = [];


fs.createReadStream('polio_cases_with_coordinates.csv')  
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });


const predictLinearRegression = (years, cases, forecastYear) => {
  const n = years.length;
  const sumX = years.reduce((a, b) => a + b, 0);
  const sumY = cases.reduce((a, b) => a + b, 0);
  const sumXY = years.reduce((sum, year, i) => sum + year * cases[i], 0);
  const sumXSquare = years.reduce((sum, year) => sum + year * year, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXSquare - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return slope * forecastYear + intercept;
};


app.get('/predict', (req, res) => {
  const forecastYear = 2025;
  const regions = [...new Set(data.map(row => row.Province))];
  const forecasts = {};

  regions.forEach(region => {
    const regionData = data.filter(row => row.Province === region);
    const years = regionData.map(row => parseInt(row.Year));
    const cases = regionData.map(row => parseInt(row['Total Cases']));

    if (years.length >= 2) {
      forecasts[region] = Math.round(predictLinearRegression(years, cases, forecastYear));
    } else {
      forecasts[region] = "Not enough data";
    }
  });

  res.json(forecasts);
});
