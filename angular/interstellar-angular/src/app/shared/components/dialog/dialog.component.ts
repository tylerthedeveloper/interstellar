// https://ng-run.com/edit/9giHmJ8bzMa8tBcZAm5t?open=app%2Fdialog.component.ts
// https://ng-run.com/edit/OP87U87X2gR7U4ZmsxN3?open=app%2Fmaterial.module.ts

import { Component, OnInit, Inject, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DynamicFormComponent } from 'app/shared/forms/dynamic-form/dynamic-form.component';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy  {

    @ViewChild('target', { read: ViewContainerRef }) vcRef: ViewContainerRef;
    componentRef: ComponentRef<any>;
    private canFinish = false;

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
                private resolver: ComponentFactoryResolver,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

      ngOnInit() {
          const factory = this.resolver.resolveComponentFactory(this.data.component);
          this.componentRef = this.vcRef.createComponent(factory);
          console.log(this.data.payload);
          Object.keys(this.data.payload).forEach(key => this.componentRef.instance[key] = this.data.payload[key]);
          if (this.componentRef.instance instanceof DynamicFormComponent) {
              (<DynamicFormComponent> this.componentRef.instance).isValid().subscribe((bool: any) => {
                  // const bool = payload.bool;
                  // const closer = payload.closer;
                  console.log(bool)
                  this.canFinish = (bool) ? true : false;
                  if (bool) {
                    this.dialogRef.close(this.componentRef.instance.form.value);
                  } else  {
                    this.dialogRef.close(false);
                  }
                });
            }
      }

    closeWithData() {
        this.dialogRef.close(this.componentRef.instance.form.value);
    }

    ngOnDestroy() {
        if (this.componentRef) {
          this.componentRef.destroy();
        }
    }
}

/*

    // loadComponent(viewContainerRef: ViewContainerRef, postItem: Product) {
    //     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicFormComponent);
    //     const componentRef = this.viewContainerRef.createComponent(componentFactory);
    //     viewContainerRef.clear();
    // }


    ngOnInit() {
      const factory = this.resolver.resolveComponentFactory(this.data.component);
      this.componentRef = this.vcRef.createComponent(factory);
      // this.componentRef.instance.questions = this.data.payload.questions;
      // this.componentRef.instance.objectMapper = this.data.payload.objectMapper;
      // this.componentRef.instance.
      Object.keys(this.data.payload).forEach(key => {
          // console.log(key);
          // console.log(this.data.payload[key]);
          this.componentRef.instance[key] = this.data.payload[key];
      });
      // this.componentRef = this.data.componentRef;
    }

     ngOnDestroy() {
      if (this.componentRef) {
        // console.log(this.dialogRef.componentInstance)
        // console.log(this.componentRef)
        // console.log(this.vcRef)
        // console.log(this.componentRef.instance.form)
        // console.log(this.componentRef.instance.payload);
        this.componentRef.destroy();
      }

    */
  // portal: ComponentPortal<any>;
    // constructor(public dialogRef: MatDialogRef<DialogComponent>,
    //             @Inject(MAT_DIALOG_DATA) public data: any) { }

    // ngOnInit() {
    //     console.log(this.data)
    //     console.log(this.data.component)
    //     this.portal = new ComponentPortal(this.data.component);
    // }

    // public invoke(modalComponent: any, modalData: any) { // : Observable<any> {
    //   this.portal = new ComponentPortal(this._data.component);
    //   const dialogRef = this.dialog.open(modalComponent, {
    //       width: '250px',
    //       data: modalData,
    //       // title:
    //   });

  //     return dialogRef.afterClosed();
  // }

