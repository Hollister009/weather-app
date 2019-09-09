import View from './index';

export class Form extends View {
  constructor(message) {
    super();
    this.message = message;
    this.element = this.render();
  }

  render(message) {
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
};
