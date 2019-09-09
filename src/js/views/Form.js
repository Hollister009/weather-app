import View from './index';

export class Form extends View {
  constructor() {
    super();
    this.message = 'Enter your location:';
    this.element = this.render();
  }

  render() {
    const form = document.createElement('form');
    form.className = 'form';
    form.setAttribute('method', 'get');
    form.setAttribute('action', '/api/location');
    form.dataset.js = 'view-form';

    form.innerHTML = `
      <label>
        <p class="subtitle">${this.message}</p>
        <input class="form-control" type="text" name="location" id="location">
        <input class="btn btn-primary" type="submit" value="Submit">
      </label>
    `;
    return form;
  }
};
