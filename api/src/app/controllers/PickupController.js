import { format, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../models/Order';

class PickupController {
  async update(req, res) {
    try {
      const paramPickup = req.params.id;

      if (!paramPickup || !paramPickup.match(/^-{0,1}\d+$/))
        return res.status(400).json({ err: 'Delivery id not provided' });

      const start_date = new Date();
      const time = format(start_date, 'HH');

      if (time !== '08' && time !== '17') {
        return res.status(400).json({
          error: `${time}hs, Horário inválido, retirada somente a patir das 8hs até as 18hs`
        });
      }

      const contPickup = await Order.findAndCountAll({
        where: {
          id: paramPickup,
          start_date: {
            [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
          }
        }
      });
      if (!contPickup) {
        return res
          .status(401)
          .json({ error: 'Entregador não possui entregas' });
      }

      if (contPickup >= 5) {
        return res
          .status(401)
          .json({ error: 'Você pode retirar somente 5 Entregas por dia' });
      }

      const pickup = await Order.findByPk(paramPickup, {
        where: {
          start_date: null,
          end_date: null
        }
      });

      pickup.start_date = start_date;
      await pickup.save();
      return res.status(200).json(pickup);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}
export default new PickupController();
