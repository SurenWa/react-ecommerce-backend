const stripe = require('stripe')(process.env.STRIPE_SECRET)

const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');

exports.createPaymentIntent = async (req, res) => {
    
    //console.log(req.body);
    const { couponApplied } = req.body;
    //return;
    //later apply coupon
    //later calculate price

    //1.Find User
    const user = await User.findOne({ email: req.user.email }).exec();

    //2.Get User Cart Total
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({ orderdBy: user._id }).exec();

    //console.log('cart total charged--->', cartTotal)
    // console.log('cart total charged--->', cartTotal, 'After Dis-->', totalAfterDiscount)
    // return;

    let finalAmount = 0

    if(couponApplied && totalAfterDiscount) {
        finalAmount = totalAfterDiscount * 100
    } else {
        finalAmount = cartTotal * 100
    }

    //3.Create Payment Intent with order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: "usd"
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable: finalAmount
    })
}

