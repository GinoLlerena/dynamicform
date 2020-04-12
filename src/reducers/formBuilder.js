import {ACTIONS} from "../constants/contants";
import {createElement, createOption, reorder} from "../utils/FormUtils";
import fpMap from "lodash/fp/map"
import filter from "lodash/fp/filter"
import curry from "lodash/fp/curry"
import cond from "lodash/fp/cond"

const isEqualElementId = (elementId, item) => item.elementId === elementId
const isDifferentElementId = (elementId, item) => item.elementId !== elementId

const getElement = (key, value, elementId, item) =>{
  if(item.elementId === elementId){
    item[key] = value;
  }
  return item;
}

const getReorder = (elementId, action, item) => {
    if(item.elementId === elementId){
      item.formElementValues = reorder(
        item.formElementValues,
        action.result.source.index,
        action.result.destination.index
      );
    }
    return item;
}

const curryGetElement = curry(getElement)
const curryGetReorder = curry(getReorder)
const curryIsEqualElementId = curry(isEqualElementId)
const curryIsDifferentElementId = curry(isDifferentElementId)

function formBuilder(state, action) {
  switch (action.type) {
    case ACTIONS.DRAG_END:
      if (!action.result.destination) {
        return state;
      }else {
        const items = reorder(
          state.items,
          action.result.source.index,
          action.result.destination.index
        );
        return {...state, items}
      }
    case ACTIONS.OPTION_DRAG_END:
      if (!action.result.destination) {
        return state;
      }else {
        const {result: {type: elementId}} = action;
        const items = fpMap(curryGetReorder(elementId, action))(state.items)
        return {...state, items}
      }
    case ACTIONS.CHANGE_VALUE:
      if (!(action.key  && action.elementId)) {
        return state;
      }else {
        const {key, value, elementId} = action;
        const items = fpMap(curryGetElement(key, value, elementId))(state.items)
        return {...state, items}
      }
    case ACTIONS.ADD_ELEMENT:
      if(action.elementType) {
        const {elementType} = action;
        return {...state, items: [...state.items, createElement(state.items.length, elementType)]}
      }
      return state;
    case ACTIONS.REM_ELEMENT:
      if(action.elementId) {
        return {...state, items: filter(curryIsDifferentElementId(action.elementId))(state.items)}
      }
      return state;
    case ACTIONS.ADD_OPTION:
      if(action.elementId) {
        const {elementId, value} = action;
        const result = Array.from(state.items);

        const addOption = cond([
          [curryIsEqualElementId(elementId), (item)=> ({...item, formElementValues: [...item.formElementValues, createOption(item.formElementValues.length, value)]})],
          [curryIsDifferentElementId(elementId), (item)=> item]
        ])

        const items =  fpMap(addOption)(result)
        return {...state, items}
      }
      return state;
    case ACTIONS.CHANGE_EDIT_MODE:
      if(action.elementId) {
        return {...state, editMode:{...state.editMode, [action.elementId] : !state.editMode[action.elementId]}}
      }
      return state;
    default:
      throw new Error();
  }
}

export default formBuilder
