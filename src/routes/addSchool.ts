import { Request, Response } from 'express';
import connection from '../db';

export const addSchool = async (req: Request, res: Response) => {
  const { name, address, latitude, longitude } = req.body;

  // Input validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const [result] = await connection.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully.', data: result });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
