import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll();

    return res.json(problems);
  }

  async show(req, res) {
    const paramId = req.params.id;
    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Order id not provided' });
    }

    const problems = await DeliveryProblem.findAll({
      where: { order_id: paramId },
      include: [{ model: Order }]
    });

    return res.json(problems);
  }

  async edit(req, res) {
    const paramId = req.params.id;
    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Delivery Problem id not provided' });
    }

    const problem = await DeliveryProblem.findOne({
      where: { id: paramId },
      include: [{ model: Order }]
    });

    return res.json(problem);
  }

  async store(req, res) {
    const paramId = req.params.id;

    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Delivery Problem id not provided' });
    }

    const { description } = req.body;
    const problem = await DeliveryProblem.create({
      order_id: paramId,
      description
    });
    return res.json(problem);
  }

  async destroy(req, res) {
    const paramId = req.params.id;

    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Delivery Problem id not provided' });
    }

    const problem = await DeliveryProblem.findByPk(paramId);

    if (!problem) {
      return res.json({ error: 'Delivery Problem not found.' });
    }

    Order.update(
      { canceled_at: new Date() },
      { where: { id: problem.delivery_id } }
    );

    const delivery = await Order.findOne({
      where: { id: problem.delivery_id },
      attributes: ['product', 'canceled_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email']
        },
        { model: Recipient, as: 'recipient', attributes: ['id', 'name'] }
      ]
    });

    await Queue.add(CancellationMail.key, {
      delivery
    });

    return res.send(delivery);
  }
}

export default new DeliveryProblemController();
