import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../src/db';
import { dishes, categories, uploadFile, uploadFileMorph } from '../../src/db/schema';
import { eq, and, like } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, type, category } = req.query;

    let conditions = [eq(dishes.active, true)];

    if (name) {
      conditions.push(like(dishes.name, `%${name}%`));
    }

    if (type) {
      conditions.push(eq(dishes.type, type as string));
    }

    if (category) {
      conditions.push(eq(dishes.category, Number(category)));
    }

    const query = db.select({
      id: dishes.id,
      name: dishes.name,
      description: dishes.description,
      price: dishes.price,
      active: dishes.active,
      createdAt: dishes.createdAt,
      updatedAt: dishes.updatedAt,
      featured: dishes.featured,
      type: dishes.type,
      category: dishes.category,
      categories: {
        id: categories.id,
        name: categories.name,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
        type: categories.type
      },
      image: {
        id: uploadFile.id,
        name: uploadFile.name,
        ext: uploadFile.ext,
        url: uploadFile.url,
      }
    })
    .from(dishes)
    .leftJoin(categories, eq(dishes.category, categories.id))
    .leftJoin(uploadFileMorph, and(
      eq(uploadFileMorph.relatedId, dishes.id),
      eq(uploadFileMorph.relatedType, 'dishes'),
      eq(uploadFileMorph.field, 'image')
    ))
    .leftJoin(uploadFile, eq(uploadFile.id, uploadFileMorph.uploadFileId))
    .where(and(...conditions));

    const filteredDishes = await query;

    res.status(200).json(filteredDishes);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch dishes' });
  }
}