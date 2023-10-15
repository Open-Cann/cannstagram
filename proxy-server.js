const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3001; // Port on which the proxy server will run

app.use(cors()); // Enable CORS for all routes

app.get('/proxy-image', async (req, res) => {
  try {
    const { imageUrl } = req.query; // Get the image URL from the query parameters
    if (!imageUrl) {
      return res.status(400).send('Image URL is missing');
    }

    // Encode the image URL before making the request
    const encodedImageUrl = encodeURIComponent(imageUrl);

    // Fetch the image from the encoded URL
    const response = await fetch(encodedImageUrl);
    const buffer = await response.buffer();

    // Set the appropriate content type header and send the image
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching image');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
