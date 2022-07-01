import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')('sk_test_XDn26j4X0Bkqf6BFADEkItOS00VLgfloMz')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  const { cart } = JSON.parse(req.body); 

  const lineItems = [];

  for (const key in cart) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: cart[key].name,
          images: [cart[key].imageUrl]
        },
        unit_amount: cart[key].price * 100
      },
      quantity: cart[key].qty
    });
  }
  const session = await stripe.checkout.sessions.create({
    line_items: [...lineItems] ,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
  console.log(session)
  res.status(200).json({ session })
}