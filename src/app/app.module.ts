import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BaseViewComponent } from './views/base-view/base-view.component';
import { BasicContentRendererComponent } from './renderers/basic-content-renderer/basic-content-renderer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableRendererComponent } from './renderers/table-renderer/table-renderer.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FadeWrapperComponent } from './common/fade-wrapper/fade-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseViewComponent,
    BasicContentRendererComponent,
    TableRendererComponent,
    FadeWrapperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
