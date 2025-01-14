import Controller from '@ember/controller';
import getNumbers from 'dummy/lib/get-numbers';

export default Controller.extend({

  numImages: 5,

  someProperty: 50,

  actions: {

    loadAbove() {
      let first = this.model.first;
      let numbers = getNumbers(first - 20, 20);
      let model = this.model.numbers;
      model.unshiftObjects(numbers);
      // this.set('model.numbers', newModel);
      this.set('model.first', first - 20);
    },

    loadBelow() {
      let last = this.model.last;
      let numbers = getNumbers(last, 20);
      let model = this.model.numbers;
      model.pushObjects(numbers);
      // this.set('model.numbers', newModel);
      this.set('model.last', last + 20);
    }
  }
});
