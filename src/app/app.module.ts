import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CodeEditorComponent } from "./editor.component";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, CodeEditorComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
