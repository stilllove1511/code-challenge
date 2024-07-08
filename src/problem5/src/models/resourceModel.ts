import { initializeDatabase } from '../database';

export interface Resource {
  id?: number;
  name: string;
  description: string;
}

export const createResource = async (resource: Resource) => {
  const { name, description } = resource;
  const db = await initializeDatabase();
  const result = await db.run(
    'INSERT INTO resources (name, description) VALUES (?, ?)',
    [name, description]
  );
  return { id: result.lastID, ...resource };
};

export const getResources = async () => {
  const db = await initializeDatabase();
  return await db.all('SELECT * FROM resources');
};

export const getResourceById = async (id: number) => {
  const db = await initializeDatabase();
  return await db.get('SELECT * FROM resources WHERE id = ?', id);
};

export const updateResource = async (id: number, resource: Resource) => {
  const { name, description } = resource;
  const db = await initializeDatabase();
  await db.run(
    'UPDATE resources SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
  return { id, ...resource };
};

export const deleteResource = async (id: number) => {
  const db = await initializeDatabase();
  await db.run('DELETE FROM resources WHERE id = ?', id);
};
