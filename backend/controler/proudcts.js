const proudcts = require("../database/model/Proudcts");
const cloudinary = require("../cloudinary");
module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const { category, color, size, genre } = req.query;

      const results = await proudcts.getAllProducts(
        category,
        color,
        size,
        genre
      );

      res.json(results);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getoneProudct: async (req, res) => {
    try {
      const idproducts = req.params.id;

      const results = await proudcts.getOneProuducts(idproducts);
      res.json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  addProudct: async (req, res) => {
    try {
      // const result = await cloudinary.uploader.upload(img_URL, {
      //   folder: "proudcts",
      // });
      const productInfo = {
        title: req.body.title,
        img: req.body.img,
        img2: req.body.img2,
        price: req.body.price,
        category: req.body.category,
        details: req.body.details,
        rating: req.body.rating,
        genre: req.body.genre,
        size: req.body.size,
        brand: req.body.brand,
        color: req.body.color,
        availability: req.body.availability,
      };
      const results = await proudcts.addProuduct(productInfo);

      res.json(results);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  deleteProudct: async (req, res) => {
    try {
      const id = req.params.id;
      const results = await proudcts.deleteOneProuducts(id);
      res.json(results);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  UpdateProudct: async (req, res) => {
    try {
      const idproducts = req.params.id;
      console.log(req.params);
      const updatedData = {
        title: req.body.title,
        img: req.body.img,
        img2: req.body.img2,
        price: req.body.price,
        category: req.body.category,
        details: req.body.details,
        rating: req.body.rating,
        genre: req.body.genre,
        size: req.body.size,
        brand: req.body.brand,
        color: req.body.color,
        availability: req.body.availability,
      };

      const results = await proudcts.UpdateProudct(updatedData, idproducts);

      res.send(results);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
