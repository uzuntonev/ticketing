import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError
} from '@gutickets/common';
import { Order } from '../models/order';
import { TicketUpdatedPublisher } from '../events/publishers/order-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/orders/:id', requireAuth,
  async (req: Request, res: Response) => {


    res.send({});
  })

export { router as deleteOrderRouter }