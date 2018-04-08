class MyFormElement<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;

    constructor(options: {
                value?: T,
                key?: string,
                label?: string,
                required?: boolean,
                order?: number,
                controlType?: string
                } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
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

// Todo: figure out serlector
class NumberInputQuestion extends MyFormElement<number> {
  controlType = 'textbox';
  type: number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}


// todo: https://embed.plnkr.co/plunk/RYRuFD


// https://embed.plnkr.co/plunk/QcCN2I
class DropdownQuestion extends MyFormElement<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}

export { MyFormElement,  TextboxQuestion, DropdownQuestion, NumberInputQuestion };
