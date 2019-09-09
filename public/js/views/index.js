export default class View {
  constructor() {
    this.render = this.render() || function() {};
  }

  set element(el) {
    this._element = el;
  }

  get element() {
    return this._element;
  }
};
