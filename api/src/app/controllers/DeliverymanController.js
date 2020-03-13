import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    try {
      const deliveryman = await Deliveryman.findAll();
      return res.json(deliveryman);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryExist = await Deliveryman.findOne({
      where: {
        email: req.body.email
      }
    });

    if (deliveryExist) {
      return res.status(400).json({ err: 'Deliveryman already exist. ' });
    }
    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email()
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation Fields Fails' });
    }
    const { email } = req.body;
    const paramId = req.params.id;
    const deliveryman = await Deliveryman.findByPk(paramId);

    if (email !== deliveryman.email) {
      const deliverymanExist = await Deliveryman.findOne({
        where: { email }
      });

      if (deliverymanExist) {
        return res.status(400).json({ error: 'Deliveryman already exist.' });
      }
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async show(req, res) {
    try {
      const paramId = req.params.id;
      const deliveryman = await Deliveryman.findByPk(paramId);
      return res.json(deliveryman);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}
export default new DeliverymanController();
