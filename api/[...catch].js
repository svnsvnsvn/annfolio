// Catch-all handler for invalid API routes
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  return res.status(404).json({
    error: 'API endpoint not found',
    message: 'The requested resource does not exist',
    available: [
      'GET /api/spotify-current - Get current playing track (public)',
    ],
    timestamp: new Date().toISOString()
  });
}
