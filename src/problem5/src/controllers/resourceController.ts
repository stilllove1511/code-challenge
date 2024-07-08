import { Request, Response } from 'express';
import { createResource, getResources, getResourceById, updateResource, deleteResource, Resource } from '../models/resourceModel';

export const create = async (req: Request, res: Response) => {
  const resource: Resource = req.body;
  const newResource = await createResource(resource);
  res.status(201).json(newResource);
};

export const list = async (req: Request, res: Response) => {
  const resources = await getResources();
  res.json(resources);
};

export const get = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const resource = await getResourceById(id);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const resource: Resource = req.body;
  const updatedResource = await updateResource(id, resource);
  res.json(updatedResource);
};

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await deleteResource(id);
  res.status(204).send();
};
