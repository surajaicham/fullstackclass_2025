const Actor = require('../models/actor');

module.exports = {
  async getAll(req, res) {
    const actors = await Actor.getAll();
    res.json(actors);
  },
  async getById(req, res) {
    const actor = await Actor.getById(req.params.id);
    if (!actor) return res.status(404).json({ error: 'Actor not found' });
    res.json(actor);
  },
  async create(req, res) {
    const newActor = await Actor.create(req.body);
    res.status(201).json(newActor);
  },
  async update(req, res) {
    const updatedActor = await Actor.update(req.body);
    if (!updatedActor) return res.status(404).json({ error: 'Actor not found' });
    res.json(updatedActor);
  },
  async delete(req, res) {
    await Actor.delete(req.params.id);
    res.json({ message: 'Actor deleted' });
  },
  async getByKeyword(req, res) {
    const keyword = req.query.keyword || '';
    const actors = await Actor.getByKeyword(keyword);
    res.json(actors);
  },
};
