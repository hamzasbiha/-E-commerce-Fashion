const connection = require("./index.js");
const sampleData = require("../Data.json");

const insertSampleProducts = function () {
  const insertQuery =
    "INSERT INTO `product` (`title`, `details`, `img`, `img2`, `price`, `color`, `category`, `genre`, `rating`, `REF`, `size`, `brand`, `availability`, `discount_price`, `created_at`, `updated_at`) VALUES ?";

  const values = sampleData.map((data) => [
    data.title,
    data.details,
    data.img,
    data.img2,
    data.price,
    data.color,
    data.category,
    data.genre,
    data.rating,
    data.REF,
    data.size,
    data.brand,
    data.availability,
    data.discount_price,
    formatDate(data.created_at), // Format created_at datetime
    formatDate(data.updated_at)  // Format updated_at datetime
  ]);

  connection.query(insertQuery, [values], (error, results) => {
    if (error) {
      console.log("Error seeding the database: ", error);
    } else {
      console.log("Database seeded successfully");
    }

    connection.end();
  });
};

// Function to format datetime value
function formatDate(datetime) {
  const date = new Date(datetime);
  const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
  return formattedDate;
}

insertSampleProducts();
