import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.js";
import Product from "./models/product.js";
import { connectToDatabase } from "./config/db.js";
import Order from "./models/order.js";
import CartProduct from "./models/cart.js";

dotenv.config();

connectToDatabase();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    await CartProduct.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// terminal commands
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
