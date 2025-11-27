import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, description, image, isActive } = req.body;

    const newProduct = await Product.create({
      name,
      category,
      price,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.update({ isActive: false });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando producto" });
  }
};