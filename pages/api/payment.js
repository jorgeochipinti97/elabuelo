import axios from "axios";

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const order = req.body;

      try {
        const body = {
          items: order.orderItems && order.orderItems.map(item => ({
            title: item.titulo,
            quantity: item.quantity,
            unit_price: item.precio,
            currency_id: 'ARS',
          })),
          payer: {
            email: order.shippingAddress.email,
          },
          back_urls: {
            success: `https://elabuelo.shop/pago/${order._id}`,
            failure: 'https://elabuelo.shop',
            pending: 'https://elabuelo.shop',
          },
          auto_return: 'approved',
        };

        const response = await axios.post('https://api.mercadopago.com/checkout/preferences', body, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer APP_USR-4057918930413722-110313-4bccb53c9b61bf172eed5962a64d5f6f-127853413`
          },
        });

        res.status(200).json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
  }
}
