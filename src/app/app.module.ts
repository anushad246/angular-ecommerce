import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MainModule } from './main/main.module';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from './servers/server';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    AppRoutingModule,
    MainModule,
    HttpClientModule
  ],
  providers: [JsonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
