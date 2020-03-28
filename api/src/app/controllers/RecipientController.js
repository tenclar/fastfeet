import * as Yup from 'yup';

import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { q } = req.query;
    const recipients = q
      ? await Recipient.findAll({
          where: {
            name: {
              [Op.iLike]: `%${q}%`
            }
          }
        })
      : await Recipient.findAll();

    return res.json(recipients);
  }

  async show(req, res) {
    const paramId = req.params.id;
    const recipient = await Recipient.findByPk(paramId);
    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      cep: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields fails' });
    }

    const recipientExist = await Recipient.findOne({
      where: {
        name: req.body.name
      }
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'Recipient already exist.' });
    }
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      cep: Yup.string()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields fails' });
    }

    const { name } = req.body;
    const paramId = req.params.id;

    const recipient = await Recipient.findByPk(paramId);

    if (name !== recipient.name) {
      const recipientExist = await Recipient.findOne({
        where: { name }
      });

      if (recipientExist) {
        return res.status(400).json({ error: 'Recipient already exist.' });
      }
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }

  async remove(req, res) {
    const paramId = req.params.id;
    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Recipient id not provided' });
    }

    const recipient = await Recipient.findByPk(paramId);

    await recipient.destroy();

    return res.json({ message: 'Recipient removed' });
  }
}

export default new RecipientController();
