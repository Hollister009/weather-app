// @ts-check
'use strict';

const types = {
  FORM: 'view-form',
  ERROR: 'view-error',
  LOADING: 'view-loading',
  INFO: 'view-info',
};

/**
 * @class View
 */
class View {
  get element() {
    return this._element;
  }

  set element(el) {
    this._element = el;
  }

  registerEvent(event, cb) {
    console.log('View.registerEvent(', event, '...)');
    this.element.addEventListener(event, cb);
  }

  unregisterEvent(event, cb) {
    this.element.removeEventListener(event, cb);
  }

  registerEventOnce(event, cb) {
    this.element.addEventListener(event, function(evt) {
      cb(evt);
      this.unregisterEvent(event, cb);
    });
  }
}

/**
 * @class Form
 */
class Form extends View {
  constructor() {
    super();
    this.message = 'Enter your location:';
    this.element = Form.renderForm(this.message);
  }

  static renderForm(message) {
    const form = App.createElement('form', 'form');
    form.setAttribute('method', 'get');
    form.setAttribute('action', '/api/location');
    form.dataset.js = 'view-form';

    form.innerHTML = `
      <label>
        <p class="subtitle">${message}</p>
        <input class="form-control" type="text" name="location" id="location">
        <input class="btn btn-primary" type="submit" value="Submit">
      </label>
    `;
    return form;
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
  constructor(type, rootId = 'root') {
    this.type = type;
    this.view = this.getCurrentView();
    this.root = document.getElementById(rootId);
    this.title = 'Weather App v1.0';
    this.author = 'Andrew Zhukevych';
    this.hero = `
      <h1 class="title white">${this.title}</h1>
      <p class="author">by ${this.author}</p>
    `;

    this.renderView();
    this.view.registerEvent('submit', evt => {
      evt.preventDefault();
      evt.stopPropagation();
      console.log(evt.target);
      return false;
    });
  }

  static init() {
    return new App(types.FORM);
  }

  /**
   * @param {String} tag - tagName
   * @param {String} [className]
   * @returns {HTMLElement}
   */
  static createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
  }

  static buildSection(name, content) {
    const section = App.createElement('section', name);
    if (typeof content === 'string') {
      section.insertAdjacentHTML('beforeend', content);
    } else {
      section.appendChild(content);
    }
    return section;
  }

  /**
   * @returns {Form|Info|ErrorMsg|Loader} instance of the view
   */
  getCurrentView() {
    switch (this.type) {
      case types.FORM:
        return new Form();
      case types.INFO:
        return new Info();
      case types.ERROR:
        return new ErrorMsg();
      case types.LOADING:
        return new Loader();
      default:
        return new ErrorMsg();
    }
  }

  renderView() {
    const { element } = this.view;
    const container = App.createElement('div', 'container');
    const heroSection = App.buildSection('hero', this.hero);
    const mainSection = App.buildSection('main', element);
    mainSection.classList.add('col-4');

    container.append(...[heroSection, mainSection]);
    this.root.appendChild(container);
  }

  // setupEvents() {
  //   const target = document.querySelector('[data-js=' + this.type + ']');

  //   switch (this.type) {
  //     case types.FORM:
  //       target.addEventListener('submit', function(e) {
  //         e.preventDefault();
  //         console.log('Hello from form!');
  //       });
  //   }
  // }
}

// Event: DOMContentLoaded
document.addEventListener('DOMContentLoaded', App.init);
