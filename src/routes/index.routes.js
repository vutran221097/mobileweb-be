import express from "express"
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import productRoutes from './product.routes'
import newsRoutes from './news.routes'
import orderRoutes from './order.routes'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/news', newsRoutes)
router.use('/order', orderRoutes)

export default router;