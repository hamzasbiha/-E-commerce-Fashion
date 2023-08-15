const conn = require("../index");

module.exports = {
  getAllProducts: (category, color, size, genre) => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM `product` WHERE 1";

      const queryParams = [];

      if (category) {
        sql += " AND category = ?";
        queryParams.push(category);
      }

      if (color) {
        sql += " AND color = ?";
        queryParams.push(color);
      }

      if (size) {
        sql += " AND size = ?";
        queryParams.push(size);
      }

      if (genre) {
        sql += " AND genre = ?";
        queryParams.push(genre);
      }

      conn.query(sql, queryParams, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getOneProuducts: (idproducts) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM `fashiondb`.`product` WHERE `idproducts` = ?";
      conn.query(sql, [idproducts], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  addProuduct: (productsInfo) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO `product` SET ?";
      conn.query(sql, [productsInfo], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  deleteOneProuducts: (idproducts) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM `product` WHERE idproducts = ?";
      conn.query(sql, [idproducts], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  UpdateProudct: (updatedData, idproducts) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE product SET ? WHERE idproducts = ?";
      console.log(idproducts)
      conn.query(sql, [updatedData, idproducts], function (error, results) {
        if (error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  },
};
