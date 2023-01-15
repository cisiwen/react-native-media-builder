export enum MCEventType {
  LayoutChanged = 'LayoutChanged',
}

export interface IMCEvent {
  type: MCEventType;
  id: string;
  callback: (param: any) => void;
}
export class MCEventBus {
  public static events: IMCEvent[] = [];

  public static addToEvents(event: IMCEvent) {
    MCEventBus.events.push(event);
  }

  public static removeFromEvents(id: string) {
    MCEventBus.events.splice(
      MCEventBus.events.findIndex((a) => a.id === id),
      1
    );
  }

  public static dispatchEevent(type: MCEventType, parameter: any) {
    MCEventBus.events
      .filter((a) => a.type === type)
      .forEach((b) => {
        b.callback(parameter);
      });
  }
}
