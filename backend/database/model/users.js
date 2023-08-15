const conn = require("../index");

module.exports = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM `user`";
      conn.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  getOneUser: (id_user) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM `user` WHERE id_user = ?";
      conn.query(sql, [id_user], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  addUser: (infouser) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Check if the user already exists
        const existingUser = await module.exports.getUserByEmail(
          infouser.email
        );
        if (existingUser) {
          reject("User already exists");
        } else {
          // Add the user to the database
          const sql =
            "INSERT INTO user (FullName, email, password, img_profile_user) VALUES (?,?,?,?)";
          conn.query(
            sql,
            [
              infouser.FullName,
              infouser.email,
              infouser.password,
              infouser.img_profile_user,
            ],
            function (error, results) {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  addToken: (tokenData) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO `password_reset_tokens` SET ?";
      conn.query(sql, tokenData, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  getTokenByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM `password_reset_tokens` WHERE user_id = ?";
      conn.query(sql, [userId], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]); // Assuming you only expect one token per user
        }
      });
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM `user` WHERE id_user = ?";
      conn.query(sql, [id], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  deleteTokenByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM `password_reset_tokens` WHERE user_id = ?";
      conn.query(sql, [userId], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateUser: (id, updatedData) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE `user` SET ? WHERE id_user = ?";
      conn.query(sql, [updatedData, id], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM user WHERE email = ?";
      conn.query(sql, [email], function (error, results) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  },
  updateUserPasswordByEmail: (email, newPassword) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Get the user by email using module.exports
        const user = await module.exports.getUserByEmail(email);
        if (!user) {
          reject("User not found");
        } else {
          // Update the user's password in the database
          const sql = "UPDATE `user` SET password = ? WHERE email = ?";
          conn.query(sql, [newPassword, email], function (error, results) {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  
};
