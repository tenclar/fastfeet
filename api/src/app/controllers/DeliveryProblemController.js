import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Order';
import Recipient from '../models/Recipient';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemController {
  async index(req, res) {
    const { paramId } = req.params;
    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Delivery Problem id not provided' });
    }

    const problems = paramId
      ? await DeliveryProblem.findAll({
          where: { delivery_id: paramId }
        })
      : await DeliveryProblem.findAll();

    return res.json(problems);
  }

  async store(req, res) {
    const { paramId } = req.params;

    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Delivery Problem id not provided' });
    }

    const { description } = req.body;
    const problem = await DeliveryProblem.create({
      delivery_id: paramId,
      description
    });
    return res.json(problem);
  }

  async destroy(req, res) {
    const { paramId } = req.params;
    if (!paramId || !paramId.match(/^-{0,1}\d+$/)) {
      return res.status(400).json({ err: 'Delivery Problem id not provided' });
    }

    const problem = await DeliveryProblem.findByPk(paramId);

    if (!problem) {
      return res.json({ error: 'Delivery Problem not found.' });
    }

    Delivery.update(
      { canceled_at: new Date() },
      { where: { id: problem.delivery_id } }
    );

    const delivery = await Delivery.findOne({
      where: { id: problem.delivery_id },
      attributes: ['product', 'canceled_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email']
        },
        { model: Recipient, as: 'recipient', attributes: ['name'] }
      ]
    });

    await Queue.add(CancellationMail.key, {
      delivery
    });

    return res.send();
  }
}

export default new DeliveryProblemController();
