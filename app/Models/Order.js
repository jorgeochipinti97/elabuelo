import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [{
    _id: { type: String},
    titulo: { type: String,  },
    size: { type: String },
    quantity: { type: Number, },
    slug: { type: String,  },
    image: { type: String, },
    precio: { type: Number, },
  }],
  shippingAddress: {
    name: { type: String },
    address: { type: String },
    zip: { type: String},
    city: { type: String},
    phone: { type: String},
    email: { type: String},
  }, 
  numberOfItems: { type: Number, required: true },
  total: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: String },
  transactionId: { type: String },
  discountCode: { type: String },
  discountPrice: { type: Number, default: 0 },
  isShipping: { type: Boolean, default: false }
}, {
  timestamps: true,
});

const Order = mongoose.models.OrderAbuelo || mongoose.model('OrderAbuelo', orderSchema);

export default Order;