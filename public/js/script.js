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
  static _element = null;

  get element() {
    return View._element;
  }

  set element(el) {
    View._element = el;
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
    this.element = this.form.outerHTML;
  }

  renderForm() {
    this.form = App.createElement('form', 'form');

    this.form.innerHTML = `
      <label>
        <p>${this.message}</p>
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
    this.title = 'Weather App v1.0';
    this.author = 'Andrew Zhukevych';
    this.hero = `
      <h1 class="title">${this.title}</h1>
      <p class="author">by ${this.author}</p>
    `;

    this.createMarkup();
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
    section.innerHTML = content;
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

  createMarkup() {
    const container = App.createElement('div', 'container');
    const heroSection = App.buildSection('hero', this.hero);
    const mainSection = App.buildSection('main', this.view.element);
    mainSection.classList.add('col-4');

    container.append(...[heroSection, mainSection]);
    this.root.appendChild(container);
  }
}

// Event: DOMContentLoaded
document.addEventListener('DOMContentLoaded', App.init);
