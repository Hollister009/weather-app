'use strict';

import PubSub from '../lib/pubsub';

export default class Store {
  constructor(params) {
    const self = this;

    this._actions = params.actions || {};
    this._mutations = params.mutations || {};
    this._events = new PubSub();
    this._status = 'resting';

    this._state = new Proxy((params.state || {}), {
      set: function(state, key, value) {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        self._events.publish('stateChange', self._state);

        if (self._status !== 'mutation') {
          console.warn(`You should use mutation to set ${key}!`);
        }

        self._status = 'resting';

        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    if (typeof this._actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTIONS: ${actionKey}`);
    this._status = 'action';
    this._actions[actionKey](this, payload);
    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    if (typeof this._mutations[mutationKey] !== 'function') {
      console.error(`Mutation "${mutationKey} doesn't exist.`);
      return false;
    }

    this._status = 'mutation';
    const newState = this._mutations[mutationKey](this, payload);

    this._state = Object.assign(this._state, newState);

    return true;
  }
}
