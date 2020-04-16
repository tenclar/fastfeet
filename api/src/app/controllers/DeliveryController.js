/* import * as Yup from 'yup'; */
import File from '../models/File';
import Delivery from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;
      const paramId = req.params.id;
      const delivery = await Delivery.findAll({
        where: { deliveryman_id: paramId, canceled_at: null },
        limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['name', 'email']
          },
          { model: Recipient, as: 'recipient', attributes: ['name', 'city'] }
        ]
      });
      return res.json(delivery);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async show(req, res) {
    try {
      const paramId = req.params.id;
      if (!paramId || !paramId.match(/^-{0,1}\d+$/))
        return res.status(400).json({ err: 'Delivery id not provided' });

      const delivery = await Delivery.findOne({
        where: {
          deliveryman_id: paramId,
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
      const paramId = req.params.id;
      if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
        return res.status(400).json({ err: 'Delivery id not provided' });
      }

      const delivery = await Delivery.findByPk(paramId);
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
