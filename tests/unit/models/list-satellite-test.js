import { module, test } from 'qunit';
import ListSatellite from 'smoke-and-mirrors/models/list-satellite';

const RELATIVE_UNIT = 100;
let App = {};

module('Unit | Model | ListSatellite', {

  beforeEach(assert) {

    App.planetADiv = document.createElement('div');
    document.body.appendChild(App.planetADiv);
    App.planetBDiv = document.createElement('div');
    document.body.appendChild(App.planetBDiv);

    App.componentA = {  element: App.planetADiv,
                        next() {},
                        prev() {},
                        satellite: true };
    App.componentB = {  element: App.planetBDiv,
                        next() {},
                        prev() {},
                        satellite: true };

  },

  afterEach(assert) {
    App.planetADiv.parentNode.removeChild(App.planetADiv);
    App.planetBDiv.parentNode.removeChild(App.planetBDiv);
    App = {};
  }

});

test('should build correctly', function(assert) {

  assert.expect(4);

  let testListSatellite = new ListSatellite(App.componentA, [App.componentA, App.componentB]);

  assert.equal(testListSatellite.component, App.componentA, "compenent set");
  assert.equal(testListSatellite.element, App.planetADiv, "element set");
  assert.equal(testListSatellite.radar, undefined, "radar initialized and not set");
  assert.deepEqual(testListSatellite.list, [App.componentA, App.componentB], "list set");

});

test('next and prev return null when only one component', function(assert) {

  assert.expect(2);

  let testListSatellite = new ListSatellite(App.componentA, [App.componentA]);

  assert.equal(testListSatellite.next(), null, "no next element");
  assert.equal(testListSatellite.prev(), null, "no prev element");

});

test('next and prev work as expected', function(assert) {

  assert.expect(4);

  App.componentA.next = function() { return App.componentB; };
  App.componentB.prev = function() { return App.componentA; };
  
  let testListSatelliteA = new ListSatellite(App.componentA, [App.componentA, App.componentB]);
  let testListSatelliteB = new ListSatellite(App.componentB, [App.componentA, App.componentB]);

  assert.equal(testListSatelliteA.next(), true, "Component B is after Component A");
  assert.equal(testListSatelliteB.next(), null, "Nothing is after Component B");
  assert.equal(testListSatelliteA.prev(), null, "Nothing is before Component A");
  assert.equal(testListSatelliteB.prev(), true, "Component A is before Component B");

});
