import type { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')('sk_test_XDn26j4X0Bkqf6BFADEkItOS00VLgfloMz')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.redirect(303, session.url);
}