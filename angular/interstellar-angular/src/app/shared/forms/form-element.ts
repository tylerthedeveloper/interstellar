
class MyFormElement<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    placeholder: string;
    disabled: boolean;

    constructor(options: {
                value?: T,
                key?: string,
                label?: string,
                required?: boolean,
                order?: number,
                controlType?: string,
                placeholder?: string
                disabled?: boolean
                } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.placeholder = options.placeholder || '';
        this.disabled = options.disabled || false;
    }
}

class TextboxQuestion extends MyFormElement<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

// Todo: figure out number selector
class NumberInputQuestion extends MyFormElement<string> {
  controlType = 'numberbox';
  type: number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}


// todo: https://embed.plnkr.co/plunk/RYRuFD
// https://stackoverflow.com/questions/35399617/angular-2-file-upload-from-input-type-file
// https://stackoverflow.com/questions/43444440/how-to-include-a-file-upload-control-in-an-angular2-reactive-form/43481420
class FileUploadQuestion extends MyFormElement<string> {
  controlType = 'filebox';
  type: File;
  hasContent: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

// https://embed.plnkr.co/plunk/QcCN2I
class DropdownQuestion extends MyFormElement<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}

class CheckBoxQuestion extends MyFormElement<string> {
  controlType = 'checkbox';
  type = 'checkbox';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
// https://stackoverflow.com/questions/48501420/how-to-get-value-in-formgroup-using-formarray
// tslint:disable-next-line:max-line-length
// https://github.com/philipphalder/angular2-dynamic-forms-advanced/blob/master/src/app/components/dynamic-question/dynamic-question.component.html

class CheckBoxGroupQuestion extends MyFormElement<string> {
  controlType = 'checkbox-group';
  type = 'checkbox';
  options: {key: string, value: string, checked: boolean}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}

export {
    MyFormElement, TextboxQuestion, DropdownQuestion,
    NumberInputQuestion, FileUploadQuestion, CheckBoxQuestion,
    CheckBoxGroupQuestion
};
