import {
  getAllKitchens,
  createKitchenModel,
  updateKitchenModel,
  deleteKitchenModel,
} from "../models/kitchen.model.js";

export const getKitchens = async (req, res) => {
  try {
    const kitchens = await getAllKitchens();
    res.json(kitchens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createKitchen = async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const kitchen = await createKitchenModel(name, description, price, image);
    res.json(kitchen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateKitchen = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;

  try {
    const kitchen = await updateKitchenModel(
      id,
      name,
      description,
      price,
      image,
    );
    res.json(kitchen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteKitchen = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteKitchenModel(id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
