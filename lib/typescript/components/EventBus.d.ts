export declare enum MCEventType {
    LayoutChanged = "LayoutChanged"
}
export interface IMCEvent {
    type: MCEventType;
    id: string;
    callback: (param: any) => void;
}
export declare class MCEventBus {
    static events: IMCEvent[];
    static addToEvents(event: IMCEvent): void;
    static removeFromEvents(id: string): void;
    static dispatchEevent(type: MCEventType, parameter: any): void;
}
//# sourceMappingURL=EventBus.d.ts.map