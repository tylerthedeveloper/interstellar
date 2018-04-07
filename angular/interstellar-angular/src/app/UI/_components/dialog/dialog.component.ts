import { Component, OnInit, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    public title: string;
    public content: string;
    // private factoryResolver: any;

    // constructor(private dialog: MatDialog,
    //             @Inject(ComponentFactoryResolver) factoryResolver,
    //             @Inject(MAT_DIALOG_DATA) public data: any) {
    //               this.factoryResolver = factoryResolver;

    //               console.log(data);
    // }
    // @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
    // private componentFactory: ComponentFactory<any>;
    // private _data;
    portal: ComponentPortal<any>;
    constructor(public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.portal = new ComponentPortal(this.data.component);
  }

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
