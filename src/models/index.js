import mongoose from "mongoose"
import User from "./user.model"
import News from "./news.model"
import Order from "./order.model"
import Product from "./product.model"
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = User;
db.news = News;
db.order = Order;
db.product = Product;

export default db