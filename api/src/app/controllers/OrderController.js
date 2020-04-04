import * as Yup from 'yup';

import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Queue from '../../lib/Queue';
import NewOrderDeliveryMail from '../jobs/NewOrderDeliveryMail';

class OrderController {
  async index(req, res) {
    try {
      const { q } = req.query;
      const orders = q
        ? await Order.findAll({
            where: {
              product: {
                [Op.iLike]: `%${q}%`
              }
            },

            include: [
              {
                model: Recipient,
                as: 'recipient',
                attributes: ['id', 'name', 'city', 'state']
              },
              {
                model: Deliveryman,
                as: 'deliveryman',
                attributes: ['id', 'name']
              }
            ]
          })
        : await Order.findAll({
            include: [
              {
                model: Recipient,
                as: 'recipient',
                attributes: ['id', 'name', 'city', 'state']
              },
              {
                model: Deliveryman,
                as: 'deliveryman',
                attributes: ['id', 'name']
              }
            ]
          });

      return res.json(orders);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
      // signature_id: Yup.number(),
      // canceled_at: Yup.date(),
      // start_date: Yup.date(),
      // end_date: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.create(req.body);

    const delivery = await Order.findOne({
      where: { id: order.id },
      attributes: ['product', 'created_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email']
        },
        { model: Recipient, as: 'recipient', attributes: ['name'] }
      ]
    });

    await Queue.add(NewOrderDeliveryMail.key, {
      delivery
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string()
      // signature_id: Yup.number(),
      // canceled_at: Yup.date(),
      // start_date: Yup.date(),
      // end_date: Yup.date()
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation Fields Fails' });
    }

    const paramId = req.params.id;
    const order = await Order.findByPk(paramId);

    await order.update(req.body);

    return res.json(order);
  }

  async show(req, res) {
    try {
      const paramId = req.params.id;
      const order = await Order.findByPk(paramId, {
        include: [
          {
            model: Recipient,
            as: 'recipient'
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name']
          }
        ]
      });
      return res.json(order);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}
export default new OrderController();
