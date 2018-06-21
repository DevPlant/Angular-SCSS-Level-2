import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BaseViewComponent } from './views/base-view/base-view.component';
import { ContentRendererComponent } from './renderers/content-renderer/content-renderer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableRendererComponent } from './renderers/table-renderer/table-renderer.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FadeWrapperComponent } from './common/fade-wrapper/fade-wrapper.component';
import { FadeWrapper2Component } from './common/fade-wrapper-2/fade-wrapper-2.component';
import { SmartFadeDirective } from './common/directives/smart-fade.directive';

@NgModule({
  declarations: [
    AppComponent,
    BaseViewComponent,
    ContentRendererComponent,
    TableRendererComponent,
    FadeWrapperComponent,
    FadeWrapper2Component,
    SmartFadeDirective,
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
