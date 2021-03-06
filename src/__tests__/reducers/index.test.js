import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import kegListReducer from '../../reducers/keg-list-reducer';
import editingReducer from '../../reducers/editing-reducer';
import * as c from '../../actions';

let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      masterKegList: {},
      formVisible: false,
      editing: false,
      selectedKeg: null
    });

  });

  test('check that initial state of kegListReducer matches root reducer', () => {
    expect(store.getState().masterKegList).toEqual(kegListReducer(undefined, { type: null }));
  });

  test('check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisible).toEqual(formVisibleReducer(undefined, { type: null }));
  });

  test('Check that initial state of kegListReducer matches root reducer', () => {
    const action = {
      type: 'ADD_KEG',
      name: "Red Berry Blaster",
      brand: "Jim's Booches",
      price: "4.00",
      flavor: "cherry",
      capacity: 124,
      howMuchLeft: "Plenty-o-Booch",
      id: 2
    }
    store.dispatch(action);
    expect(store.getState().masterKegList).toEqual(kegListReducer(undefined, action));
  });

  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    const action = {
      type: 'TOGGLE_FORM'
    }
    store.dispatch(action);
    expect(store.getState().formVisible).toEqual(formVisibleReducer(undefined, action));
  });

  test('Check that initial state of editingReducer matches root reducer', () => {
    const action = {
      type: 'TOGGLE_EDIT_FORM'
    }
    store.dispatch(action);
    expect(store.getState().editing).toEqual(editingReducer(undefined, action));
  });

  test('Check that initial root reducer passes back a keg id and state', () => {

    const action = c.selectKeg(2);
    store.dispatch(action);
    expect(store.getState().selectedKeg).toEqual(2);
  });

  test('Check that initial root reducer passes back a keg id and state', () => {
    const postPullState = {
      2: {
        name: "Red Berry Blaster",
        brand: "Jim's Booches",
        price: "4.00",
        flavor: "cherry",
        capacity: 123,
        howMuchLeft: "Plenty-o-Booch",
        id: 2
      }
    }

    const action = c.pullKeg(2);
    store.dispatch(action);
    expect(store.getState().masterKegList).toEqual(postPullState);
  });

});