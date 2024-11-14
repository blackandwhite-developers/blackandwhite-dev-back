import express from 'express';
import EventController from '../controller/event.controller';
import { ROUTES_INDEX } from '@/api';

const eventController = new EventController();

const eventRouter = express.Router();
eventRouter.get(ROUTES_INDEX.EVENT_API, eventController.getEvent);
export default eventRouter;
