import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../src/db';
import { categories } from '../../src/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    let query = db.select().from(categories);

    const allCategories = await query;
    
    res.status(200).json(allCategories);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
