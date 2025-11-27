import Product from "../models/product.model.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    const { search, category, sort, page = 1, limit = 12, isBestSeller, isNew } = req.query;

    const whereClause = { isActive: true };

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }

    if (category) {
      whereClause.category = category;
    }

    if (isBestSeller === 'true') {
      whereClause.isBestSeller = true;
    }

    if (isNew === 'true') {
      whereClause.isNew = true;
    }

    let orderClause = [['createdAt', 'DESC']];

    if (sort === 'price_asc') orderClause = [['price', 'ASC']];
    if (sort === 'price_desc') orderClause = [['price', 'DESC']];
    if (sort === 'name_asc') orderClause = [['name', 'ASC']];
    if (sort === 'name_desc') orderClause = [['name', 'DESC']];

    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      order: orderClause,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      products: rows
    });

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
    const { name, category, price, description, image, isActive, isBestSeller, isNew } = req.body;

    const newProduct = await Product.create({
      name,
      category,
      price,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true,
      isBestSeller: isBestSeller || false,
      isNew: isNew || false
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