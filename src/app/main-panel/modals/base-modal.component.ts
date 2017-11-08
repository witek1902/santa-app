import {EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {MaterializeAction} from 'angular2-materialize/dist';
import {Subscription} from 'rxjs/Subscription';

declare var $: any;
declare var Materialize: any;

export abstract class BaseModal implements OnInit, OnDestroy {
  public modalActions = new EventEmitter<string | MaterializeAction>();
  public modalParams: any;
  public errorMessage = '';
  public successMessage = '';
  protected openModal$: Subscription;


  ngOnInit(): void {
    this.modalParams = {
      dismissible: false,
      in_duration: 900,
      out_duration: 900
    };

    this.errorMessage = '';
    this.successMessage = '';
  }


  ngOnDestroy(): void {
    this.openModal$.unsubscribe();
  }

  public openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout(() => Materialize.updateTextFields(), 500);
  }

  public closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
    $('.modal-overlay').remove();
  }

}
