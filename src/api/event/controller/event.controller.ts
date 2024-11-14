import EventTrigger from '@/api/common/event/main.event';
import { Request, Response, NextFunction } from 'express';
export default class eventController {
  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      const eventHandler = (data: unknown) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      EventTrigger.onEvent('newEvent', eventHandler);

      req.on('close', () => {
        EventTrigger.offEvent('newEvent', eventHandler);
        res.end();
      });
    } catch (error) {
      next(error);
    }
  }
}
