/* import * as Yup from 'yup'; */
import { Op } from 'sequelize';
import File from '../models/File';
import Delivery from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index(req, res) {
    try {
      const { page = 1, limit = 5, status = null } = req.query;
      const paramId = req.params.id;
      const delivery = status
        ? await Delivery.findAll({
            where: {
              deliveryman_id: paramId,
              canceled_at: null,
              end_date: {
                [Op.not]: null
              }
            },
            limit,
            offset: (page - 1) * limit,
            include: [
              {
                model: Deliveryman,
                as: 'deliveryman',
                attributes: ['name', 'email']
              },
              {
                model: Recipient,
                as: 'recipient',
                attributes: ['name', 'city', 'street', 'number', 'complement']
              }
            ]
          })
        : await Delivery.findAll({
            where: {
              deliveryman_id: paramId,
              canceled_at: null,
              end_date: null
            },
            limit,
            offset: (page - 1) * limit,
            include: [
              {
                model: Deliveryman,
                as: 'deliveryman',
                attributes: ['name', 'email']
              },
              {
                model: Recipient,
                as: 'recipient',
                attributes: [
                  'name',
                  'city',
                  'street',
                  'number',
                  'complement',
                  'state'
                ]
              }
            ]
          });
      return res.json(delivery);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async show(req, res) {
    try {
      const { id, deliveryId } = req.params;
      /* if (!paramId || !paramId.match(/^-{0,1}\d+$/))
        return res.status(400).json({ err: 'Delivery id not provided' }); */

      const delivery = await Delivery.findOne({
        where: {
          id,
          deliveryman_id: deliveryId,

          start_date: null,
          canceled_at: null
        }
      });

      if (!delivery) {
        return res.status(404).json({ err: 'delivery not found' });
      }

      return res.json(delivery);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async update(req, res) {
    try {
      console.log('consulta api');
      const { id, deliverymanId } = req.params;

      const delivery = await Delivery.findOne({
        where: {
          id,
          deliveryman_id: deliverymanId
        }
      });

      if (!delivery) {
        return res.status(404).json({ err: 'delivery not found' });
      }
      const { originalname: name, filename: path } = req.file;
      const file = await File.create({ name, path });

      delivery.start_date = new Date();
      delivery.signature_id = file.id;

      await delivery.save();

      return res.json({ msg: 'Entregue' });
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}
export default new DeliveryController();
