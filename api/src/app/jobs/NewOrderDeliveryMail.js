import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class NewOrderDeliveryMail {
  get key() {
    return 'NewOrderDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    const dta = format(
      parseISO(delivery.created_at),
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: ptBR
      }
    );

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova Entrega Recebida',
      template: 'neworderdelivery',
      context: {
        deliveryman: delivery.deliveriman.name,
        recipient: delivery.recipient.name,
        product: delivery.product,
        date: dta
      }
    });
  }
}

export default new NewOrderDeliveryMail();
