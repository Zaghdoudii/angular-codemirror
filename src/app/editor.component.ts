import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import * as CodeMirror from "codemirror";

export type CodeEditorMode = "sql" | "javascript";

@Component({
  selector: "code-editor",
  template: `<textarea #editorHolder></textarea>`
})
export class CodeEditorComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild("editorHolder", { static: true })
  editorHolder: any;

  @Input()
  mode: CodeEditorMode = "javascript";

  @Input()
  lineNumbers: boolean = true;

  @Input()
  readonly: boolean = false;

  private _code: string;

  onTouched: () => void;
  onChanged: (v) => void;

  codeMirrorInstance: any;

  ngOnInit(): void {
    console.log(this.editorHolder);
  }

  ngAfterViewInit(): void {
    this.codeMirrorInstance = CodeMirror.fromTextArea(
      this.editorHolder.nativeElement,
      {
        value: this._code ? this._code : "",
        mode: this.mode,
        lineNumbers: this.lineNumbers
      }
    );

    this.codeMirrorInstance.on("change", (inst, obj) => {
      if (inst.doc.getValue() !== this._code) {
        this._code = inst.doc.getValue();
        if (this.onChanged) {
          this.onChanged(this._code);
        }
      }
    });
  }

  writeValue(str: string): void {
    if (str !== this._code) {
      this._code = str;
      this.codeMirrorInstance.doc.setValue(this._code);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
    this.codeMirrorInstance.optio;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
}
