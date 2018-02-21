import {Injectable, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventEmitterService {

    //dataStr = new EventEmitter();
    dataStr = new Subject();
    
    constructor() {}

    sendMessage = (data: string) => {
        this.dataStr.next(data);
    }
}
