const conn = require("../index");

module.exports = {
  getOrdersByUser: (user_id_user) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT DISTINCT o.*, p.*, u.*
        FROM \`order\` AS o
        JOIN product AS p ON o.product_idproducts = p.idproducts
        JOIN user AS u ON o.user_id_user = u.id_user
        WHERE o.user_id_user = ?
      `;
      conn.query(sql, user_id_user, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getOrders: () => {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT DISTINCT o.*, p.*, u.*
      FROM \`order\` AS o
      JOIN product AS p ON o.product_idproducts = p.idproducts
      JOIN user AS u ON o.user_id_user = u.id_user
      WHERE o.user_id_user = u.id_user`;
      conn.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  makeOrder: (product_idproducts, user_id_user, quantity) => {
    return new Promise((resolve, reject) => {
      if (
        !Array.isArray(product_idproducts) ||
        product_idproducts.length === 0 ||
        !Array.isArray(quantity) ||
        quantity.length === 0 ||
        product_idproducts.length !== quantity.length
      ) {
        reject(new Error("Invalid product IDs or quantities"));
        return;
      }

      // Map each product ID and quantity to a separate query promise
      const orderPromises = product_idproducts.map((product_id, index) => {
        const productQuantity = quantity[index];
        return new Promise((resolve, reject) => {
          const sql =
            "INSERT INTO `order` (product_idproducts, user_id_user, quantity) VALUES (?, ?, ?)";
          // Assuming you have a quantity for each product, modify the 'quantity' value as needed.
          // Replace this with the appropriate quantity value.
          conn.query(
            sql,
            [product_id, user_id_user, productQuantity],
            function (error, results) {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        });
      });

      // Execute all the insert queries concurrently using Promise.all
      Promise.all(orderPromises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  },

  deleteOrder: (orderId) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM `order` WHERE id_order = ?";
      conn.query(sql, orderId, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  updateOrder: (orderId, newStatus) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE `order` SET status = ? WHERE id_order = ?";
      conn.query(sql, [newStatus, orderId], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
};
