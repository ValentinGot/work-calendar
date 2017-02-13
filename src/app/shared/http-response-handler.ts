import { Response } from '@angular/http';
import { Observable } from 'rxjs';

export class HttpResponseHandler {

  public extractData (res: Response) {
    let body = res.json();

    return body || {};
  }

  public handleError (error: Response) {
    let err: any = {};

    switch (error.status) {
      case 401:
        err = {
          status : error.status,
          error  : error.json(),
          message: 'Unauthorized'
        };
        break;

      default:
        err = {
          status : 500,
          error  : error.json(),
          message: 'An error occured'
        };
        break;
    }

    return Observable.throw(err);
  }

}
