import {Injectable, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventEmitterService {

    // dataStr = new EventEmitter();
    dataStr = new Subject();

    constructor() {
        console.log('creating ervent emitter')
    }

    sendMessage = (data: {}) => {
        this.dataStr.next(data);
    }

    selectCategory = (category: string) => {
        this.dataStr.next({
            message: 'category',
            category: category
        });
    } 
}
