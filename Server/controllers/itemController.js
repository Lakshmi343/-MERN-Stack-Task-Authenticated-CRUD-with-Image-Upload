const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.path : '';
  const item = await Item.create({ title, description, image, user: req.user });
  res.status(201).json(item);
};

exports.getItems = async (req, res) => {
  const items = await Item.find({ user: req.user });
  res.json(items);
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const update = { ...req.body };
  if (req.file) update.image = req.file.path;

  const item = await Item.findOneAndUpdate({ _id: id, user: req.user }, update, { new: true });
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findOneAndDelete({ _id: id, user: req.user });
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json({ message: 'Item deleted' });
};
