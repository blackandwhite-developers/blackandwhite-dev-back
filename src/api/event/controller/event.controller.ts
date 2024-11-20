import EventTrigger from '@/api/common/event/main.event';
import { Request, Response, NextFunction } from 'express';
export default class eventController {
  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'content-encoding': 'none',
      });

      const eventTypes = ['message', 'newEvent', 'alarm'];

      const eventHandler = (...args: unknown[]) => {
        const [eventType, data] = args;
        res.write(
          `data: ${JSON.stringify(
            {
              eventType,
              data,
            },
            null,
            2,
          )}\n\n`,
        );
      };

      eventTypes.forEach(eventType => {
        return EventTrigger.onEvent(eventType, eventHandler);
      });

      req.on('close', () => {
        EventTrigger.offEvent('newEvent', eventHandler);
        res.end();
      });
    } catch (error) {
      next(error);
    }
  }

  async postEvent(req: Request, res: Response, next: NextFunction) {
    const { eventType, data } = req.body;
    try {
      EventTrigger.emitEvent(eventType, data);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }
}
