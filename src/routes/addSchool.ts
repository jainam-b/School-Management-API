import { Request, Response } from 'express';
import connection from '../db';
import {z} from "zod";
// Input validation using ZOD library 
const schoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().refine(val => Math.abs(val) <= 90, {
    message: "Latitude must be between -90 and 90"
  }),
  longitude: z.number().refine(val => Math.abs(val) <= 180, {
    message: "Longitude must be between -180 and 180"
  }) 
});

// add school logic 
export const addSchool = async (req: Request, res: Response) => {
  const validatedData = schoolSchema.parse(req.body);
  const { name, address, latitude, longitude } = validatedData;

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
