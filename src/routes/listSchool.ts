import { Request, Response } from 'express';
import connection from '../db';

export const listSchools = async (req: Request, res: Response) => {
  const { latitude, longitude } = req.query;

  // Input validation
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const [schools] = await connection.query('SELECT * FROM schools');
    
    // Calculate distances and sort by proximity
    const userLatitude = parseFloat(latitude as string);
    const userLongitude = parseFloat(longitude as string);

    const sortedSchools = (schools as any[]).map((school) => {
      const schoolLatitude = school.latitude;
      const schoolLongitude = school.longitude;
      
      const distance = Math.sqrt(
        Math.pow(userLatitude - schoolLatitude, 2) + Math.pow(userLongitude - schoolLongitude, 2)
      );

      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json({ schools: sortedSchools });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
