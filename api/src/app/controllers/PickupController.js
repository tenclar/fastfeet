// import { format, startOfDay, endOfDay } from 'date-fns';
// import { Op } from 'sequelize';
import Order from '../models/Order';

class PickupController {
  async update(req, res) {
    try {
      const { deliverymanId, id } = req.params;

      if (!id || !id.match(/^-{0,1}\d+$/))
        return res.status(400).json({ err: 'Delivery id not provided' });
      if (!deliverymanId || !deliverymanId.match(/^-{0,1}\d+$/))
        return res.status(400).json({ err: 'DeliveryMan id not provided' });

      const start_date = new Date();
      // const time = format(start_date, 'HH');
      const time = start_date.getHours();

      if (time < 8 && time > 18) {
        return res.status(400).json({
          error: `${time}hs, Horário inválido, retirada somente a patir das 8hs até as 18hs`
        });
      }

      const { count } = await Order.findAndCountAll({
        where: {
          id,
          deliveryman_id: deliverymanId
          /* start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
        } */
        }
      });

      if (!count) {
        return res
          .status(401)
          .json({ error: 'Entregador não possui entregas' });
      }

      if (count >= 5) {
        return res
          .status(401)
          .json({ error: 'Você pode retirar somente 5 Entregas por dia' });
      }

      const pickup = await Order.findOne({
        where: {
          id,
          deliveryman_id: deliverymanId,
          start_date: null,
          end_date: null
        }
      });

      pickup.start_date = start_date;
      await pickup.save();
      return res.status(200).json(pickup);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
export default new PickupController();
