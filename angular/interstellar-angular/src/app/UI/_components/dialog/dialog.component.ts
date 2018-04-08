import { Component, OnInit, Inject, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    @ViewChild('target', { read: ViewContainerRef }) vcRef: ViewContainerRef;

    componentRef: ComponentRef<any>;

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
                private resolver: ComponentFactoryResolver,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      const factory = this.resolver.resolveComponentFactory(this.data.component);
      this.componentRef = this.vcRef.createComponent(factory);
      // this.componentRef.instance.questions = this.data.payload.questions;
      // this.componentRef.instance.objectMapper = this.data.payload.objectMapper;
      Object.keys(this.data.payload).forEach(key => {
          console.log(key);
          console.log(this.data.payload[key]);
          this.componentRef.instance[key] = this.data.payload[key];
      });
      // this.componentRef = this.data.componentRef;
    }


    ngOnDestroy() {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
    }  
    
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


}
