export const environment = {
    production: false,
    // backendapiURL: 'http://localhost:3001/api', // Mock API for testing using Mockoon API 
    // apiURL: 'http://localhost:3002/api' // Backend API from Express run on a different port
    apiURL: process.env['API_URL'] || 'http://localhost:3002/api'
    // googleMapsApiKey: 'YOUR_API_KEY_HERE'
    // backendapiURL : 'http://localhost:3002/api'
};
