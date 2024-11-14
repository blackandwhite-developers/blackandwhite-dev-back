import { EventEmitter } from 'events';

class EventTrigger {
  private static instance: EventTrigger;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
  }

  public static getInstance(): EventTrigger {
    if (!EventTrigger.instance) {
      EventTrigger.instance = new EventTrigger();
    }
    return EventTrigger.instance;
  }

  emitEvent(event: string, data: object) {
    this.eventEmitter.emit(event, data);
  }

  onEvent(event: string, listener: (...args: unknown[]) => void) {
    EventTrigger.getInstance().eventEmitter.on(event, listener);
  }

  offEvent(event: string, listener: (...args: unknown[]) => void) {
    EventTrigger.getInstance().eventEmitter.off(event, listener);
  }

  startPeriodicEvent(event: string, data: object, interval: number) {
    return setInterval(() => {
      this.emitEvent(event, data);
    }, interval);
  }

  stopPeriodicEvent(interval: NodeJS.Timeout) {
    clearInterval(interval);
  }
}

export default EventTrigger.getInstance();
