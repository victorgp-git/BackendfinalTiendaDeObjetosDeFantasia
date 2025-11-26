import Product from "../models/product.model.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);

  } catch (error) {
    console.error("Error obteniendo producto:", error);
    res.status(500).json({ error: "Error obteniendo producto" });
  }
};
