// @ts-check
'use strict';

import { Form } from './views/form';
import { Info } from './views/info';
import { Loader } from './views/loader';

const types = {
  FORM: 'view-form',
  LOADING: 'view-loading',
  INFO: 'view-info',
};

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

    this.render();
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
   * @returns {Form|Info|Loader} new instance
   */
  getCurrentView() {
    switch (this.type) {
      case types.FORM:
        return new Form();
      case types.INFO:
        return new Info();
      case types.LOADING:
        return new Loader();
      default:
        return new Form();
    }
  }

  render() {
    const { element } = this.view;
    const container = App.createElement('div', 'container');
    const heroSection = App.buildSection('hero', this.hero);
    const mainSection = App.buildSection('main', element);
    // mainSection.classList.add('col-4');

    container.append(...[heroSection, mainSection]);
    this.root.appendChild(container);
  }
}

// Event: DOMContentLoaded
document.addEventListener('DOMContentLoaded', App.init);
