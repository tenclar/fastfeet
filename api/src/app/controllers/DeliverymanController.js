import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    try {
      const { q } = req.query;
      const deliverymans = q
        ? await Deliveryman.findAll({
            where: {
              name: {
                [Op.iLike]: `%${q}%`
              }
            }
          })
        : await Deliveryman.findAll();
      return res.json(deliverymans);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async show(req, res) {
    const paramId = req.params.id;
    const deliveryman = await Deliveryman.findByPk(paramId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }
      ]
    });
    return res.json(deliveryman);
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

  async remove(req, res) {
    const paramId = req.params.id;
    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Recipient id not provided' });
    }

    const deliveryman = await Deliveryman.findByPk(paramId);

    await deliveryman.destroy();

    return res.json({ message: 'Recipient removed' });
  }
}
export default new DeliverymanController();
