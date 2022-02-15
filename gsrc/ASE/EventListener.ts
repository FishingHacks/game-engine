interface IEvent {
    event: string,
    cb: (...args)=>void
}

export default class EventManager {
    private _cbs: Array<IEvent> = [];

    constructor() { }
    
    on(event: string, func: (...args) => void) {
        this._cbs.push({ event, cb: func });
    }

    call(event: string, ...args) {
        this._cbs.forEach(el => {
            if (el.event == event) el.cb(...args);
        });
    }
}