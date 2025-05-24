import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    // on declarations we will have only non standalone componets.
    declarations : [AppComponent],
    // this Modules and components inside that modules will access all componet which we declared on above.
    imports : [BrowserModule, FormsModule],
    // we are telling angular to initialize the below mentioned comonents when this module got loaded.
    bootstrap : [AppComponent]

})
export class AppModule {

}