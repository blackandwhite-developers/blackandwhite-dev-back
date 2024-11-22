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
      const eventHandler = (...args: unknown[]) => {
        const [data] = args;
        res.write(
          `data: ${JSON.stringify({
            data,
          })}\n\n`,
        );
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

  async postEvent(req: Request, res: Response, next: NextFunction) {
    const { data } = req.body;
    try {
      EventTrigger.emitEvent('newEvent', data);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }
}
