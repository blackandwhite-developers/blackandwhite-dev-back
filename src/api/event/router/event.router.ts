import express from 'express';
import EventController from '../controller/event.controller';
import { ROUTES_INDEX } from '@/api';
import { extractPath } from '@/utils/path.util';

const eventController = new EventController();

const EVENT_ROUTES = {
  EVENT_API: `/api/event`,
} as const;

const eventRouter = express.Router();
eventRouter.get(extractPath(EVENT_ROUTES.EVENT_API, ROUTES_INDEX.EVENT_API), eventController.getEvent);
eventRouter.post(extractPath(EVENT_ROUTES.EVENT_API, ROUTES_INDEX.EVENT_API), eventController.postEvent);
export default eventRouter;
