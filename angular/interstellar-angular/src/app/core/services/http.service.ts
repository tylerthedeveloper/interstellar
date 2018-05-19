import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

    constructor(private _httpClient: HttpClient) { }

    httpGetRequest(url: string) {
        return this._httpClient.get(url).toPromise().then(response => JSON.stringify(response));
    }

    httpGetRequestWithArgs(url: string, args: any = {}) {
        // const key = args.key;
        // const param = args.param;
        return this._httpClient.get(url).toPromise().then(response => JSON.stringify(response));
    }
}
