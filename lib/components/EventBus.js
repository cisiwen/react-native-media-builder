export var MCEventType;
(function (MCEventType) {
    MCEventType["LayoutChanged"] = "LayoutChanged";
})(MCEventType || (MCEventType = {}));
export class MCEventBus {
    static addToEvents(event) {
        MCEventBus.events.push(event);
    }
    static removeFromEvents(id) {
        MCEventBus.events.splice(MCEventBus.events.findIndex((a) => a.id === id), 1);
    }
    static dispatchEevent(type, parameter) {
        MCEventBus.events
            .filter((a) => a.type === type)
            .forEach((b) => {
            b.callback(parameter);
        });
    }
}
MCEventBus.events = [];
//# sourceMappingURL=EventBus.js.map