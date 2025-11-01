import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LoggerService } from "../services/logger.service";

export class TextProps {
  help?: string;
  pattern?: string;
  placeholder?: string;
  style?: any;
  value?: string;
  OnChange: ((value: string) => any) | undefined;
}

@Component({
  selector: 'ajm-text',
  template: `
    @if (this.props.help) {
      <div style="color: lightgray; fontSize: 10px; padding: 2px;">{{this.props.help}}</div>
    }
    <input style={{this.props.style}} placeholder={{this.props.placeholder}} type="text" value={{this.props.value}}
      (change)="this.OnChange($event);"
      (input)="this.Validate($event)" />`,
  styles: []
})

export class TextComponent {
  @Input() props: TextProps = new TextProps();
  @Output() OnInput: EventEmitter<any> = new EventEmitter();
  public valid: boolean = true;

  public constructor(public logger: LoggerService) {}
  public OnChange = (e: any) => {
    this.logger.LogDebug(`ajm-text: OnChange(${e.target.value})`);
    this.OnInput.emit(e.target.value);
  }

  public Validate = (e: any) => {
    if (this.props.pattern) {
      this.logger.LogInformation(`Input.validate ${e.key} => ${this.props.pattern}: ${e.key.match(this.props.pattern)}`);
      if (e.key.match(!this.props.pattern)) {
        e.preventDefault();
      } else {
        this.OnInput.emit(e.target.value);
      }
    } else {
      this.OnInput.emit(e.target.value);
    }
  }
}