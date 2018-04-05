import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventEmitterService {

    dataStr = new Subject();

    constructor() {
        console.log('creating event emitter');
    }
    
    /**
     * @param  {{}} data
     */
    sendMessage = (data: {}) => {
        this.dataStr.next(data);
    }
    
    /**
     * @param  {string} category
     */
    selectCategory = (category: string) => {
        this.dataStr.next({
            message: 'category',
            category: category
        });
    }
}
