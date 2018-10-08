import {Component, ComponentFactoryResolver, ComponentRef, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
  })
  export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('target', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  componentRef: ComponentRef<any>;
  faTimesCircle = faTimesCircle;
  constructor(
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.viewContainerRef.createComponent(factory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
