import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandleService {

  /**
   * @description Constructs the GlobalErrorHandleService with dependency injection.
   * @param _injectable Angular Injector for runtime service resolution.
   */
  constructor(private _injectable: Injector) {}


  /**
   * @description Handles and logs errors globally, including HTTP and navigation errors.
   * @param error The error object to handle (can be HttpErrorResponse or any error).
   * @return void
   */
  handleError(error: any): void {
    const routerProperty = this._injectable.get(Router);
    console.warn(`${routerProperty.url}`);

    if (error instanceof HttpErrorResponse) {
      console.log(`Error from backend ${error.status}`);
      console.log(`Response body ${error.message}`);
    } else {
      console.warn(`An error occurred ${error.message}`);
    }
  }
}
