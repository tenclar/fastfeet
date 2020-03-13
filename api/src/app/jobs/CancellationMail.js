import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    const dta = format(
      parseISO(delivery.canceled_at),
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: ptBR
      }
    );

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancellation',
      context: {
        deliveryman: delivery.deliveriman.name,
        recipient: delivery.recipient.name,
        product: delivery.product,
        date: dta
      }
    });
  }
}

export default new CancellationMail();
