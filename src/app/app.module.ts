import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PopupModule } from "@progress/kendo-angular-popup";
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PopupDetailComponent } from './popup-detail/popup-detail.component';
import { LabelModule } from "@progress/kendo-angular-label";



@NgModule({
  declarations: [
    AppComponent,
    PopupDetailComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule,
    FormsModule,
    PopupModule,
    InputsModule,
    LabelModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
