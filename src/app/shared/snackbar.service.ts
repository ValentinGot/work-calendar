import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';

@Injectable()
export class SnackbarService {

  constructor (
    private snackbar: MdSnackBar
  ) { }

  /**
   * Opens a success snackbar.
   *
   * @param   {string}                        message The message to show in the snackbar.
   * @param   {string}                        action  The label for the snackbar action.
   * @returns {MdSnackBarRef<SimpleSnackBar>}
   */
  success (message: string, action?: any) {
    return this._snackbar('success', message, action);
  }

  /**
   * Opens an info snackbar.
   *
   * @param   {string}                        message The message to show in the snackbar.
   * @param   {string}                        action  The label for the snackbar action.
   * @returns {MdSnackBarRef<SimpleSnackBar>}
   */
  info (message: string, action?: any) {
    return this._snackbar('info', message, action);
  }

  /**
   * Opens a warning snackbar.
   *
   * @param   {string}                        message The message to show in the snackbar.
   * @param   {string}                        action  The label for the snackbar action.
   * @returns {MdSnackBarRef<SimpleSnackBar>}
   */
  warning (message: string, action?: any) {
    return this._snackbar('warning', message, action);
  }


  /**
   * Opens an error snackbar.
   *
   * @param   {string}                        message The message to show in the snackbar.
   * @param   {string}                        action  The label for the snackbar action.
   * @returns {MdSnackBarRef<SimpleSnackBar>}
   */
  error (message: string, action?: any) {
    return this._snackbar('error', message, action);
  }

  _snackbar (type: string, message: string, action?: any) {
    return this.snackbar.open(message, action, {
      duration: 3000
    });
  }
}
