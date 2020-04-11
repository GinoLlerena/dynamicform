import {ACTIONS} from "../constants/contants";
import set from 'lodash/fp/set'

function formRenderReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ON_CHANGE_RENDER:
      return {valueMap: set( action.id, action.value)(state.valueMap)};
    default:
      throw new Error();
  }
}

export default formRenderReducer
