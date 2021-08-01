import axios from 'axios';
import { GetServerSideProps } from 'next';
import buildClient from '../../api/build-client';
import TicketShowPage from '../../components/tickets/show-page';

type Ticket = {
  title: string,
  price: number,
  userId: string,
  version: number,
  id: string
}
type ShowTicketPageProps = {
  ticket: Ticket
  currentUser?: { id: string; email: string; iat: number };
}
  
  export const getServerSideProps: GetServerSideProps<ShowTicketPageProps> = async (context) => {
    const client = buildClient(context);
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);

    return {
      props: {
            ticket: data
      },
    };
  };

export default TicketShowPage;
