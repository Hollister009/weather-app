// @ts-check
'use strict';

const types = {
  FORM: 'view-form',
  ERROR: 'view-error',
  LOADING: 'view-loading',
  INFO: 'view-info',
}

/**
 * @class View
 */
class View {
  _element = null;

  get element() {
    return this._element;
  }

  set element(el) {
    this._element = el;
  }
}

/**
 * @class Form
 */
class Form extends View {
  constructor() {
    super();
    this.message = 'Enter your location:';
    this.renderForm();
    this.element = this.form;
  }

  renderForm() {
    this.form = document.createElement('form');

    this.form.innerHTML = `
      <label>
        <span>${this.message}</span>
        <input type="text" name="location" id="location">
        <input type="submit" value="Submit">
      </label>
    `;
  }
}

/**
 * @class ErrorMsg
 */
class ErrorMsg extends View {
  renderErrorMsg() {
    const div = document.createElement('div');
  }
}

/**
 * @class Loader
 */
class Loader extends View {
  renderLoader() {
    const div = document.createElement('div');
  }
}

/**
 * @class Info
 */
class Info extends View {
  renderInfo() {
    const div = document.createElement('div');
  }
}

class App {
  constructor(type) {
    this.type = type;
    this.view = this.getCurrentView();
    this.root = document.getElementById('root');
    this.container = this.createElement('div', 'container');

    this.container.appendChild(this.view.element);
    this.root.appendChild(this.container);
  }

  static init() {
    return new App(types.FORM);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
  }

  /**
   * @returns {Form|Info|ErrorMsg|Loader} instance of the view
   */
  getCurrentView() {
    switch(this.type) {
      case types.FORM: return new Form();
      case types.INFO: return new Info();
      case types.ERROR: return new ErrorMsg();
      case types.LOADING: return new Loader();
      default: return new ErrorMsg();
    }
  }
}

// Event: DOMContentLoaded
document.addEventListener('DOMContentLoaded', App.init);
