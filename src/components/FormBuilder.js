
import React, { useReducer } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import form from '../templates/data'
import FormEditElement from "../form/FormEditElement"
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import {ELEMENT_TYPE, ACTIONS, TYPES} from '../constants/contants'
import {createOption, createElement, reorder, getListStyle, getItemStyle} from '../utils/FormUtils'

function FormItems({items, onRemElement, onChangeValue, onDragEnd, editMode, onToggle, onAddOption}) {

  const list = items && items.length ? items.map((item, index) => (
    <Draggable key={item.elementId} draggableId={item.elementId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <FormEditElement key={item.elementId} element={item} onRemElement={()=>onRemElement(item.elementId)} onChange={onChangeValue(item.elementId)} onDragEnd={onDragEnd} editMode={editMode} onToggle={onToggle} onAddOption={onAddOption} />
        </div>
      )}
    </Draggable>
  )) : null;

  return list;
}

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
function Form(props) {
    const {onDragEnd, items, onRemElement, onChangeValue, editMode, onToggle, onAddOption} = props;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type={TYPES.MAIN}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <FormItems items={items} onRemElement={onRemElement} onChangeValue={onChangeValue} onDragEnd={onDragEnd} editMode={editMode} onToggle={onToggle} onAddOption={onAddOption} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

function init() {
  return {items: map(form.formElements, element => ({...element, readOnly:true})), editMode: reduce(form.formElements, (result, element)=>{result[element.elementId] = false; return result;}, {})};
}

function reducer(state, action) {
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
        const {result} = action;

        const items = map(state.items, item => {
          if(item.elementId === result.type){
            item.formElementValues = reorder(
              item.formElementValues,
              action.result.source.index,
              action.result.destination.index
            );
          }
          return item;
        })

        return {...state, items}
      }
    case ACTIONS.CHANGE_VALUE:
      if (!(action.key && action.value && action.elementId)) {
        return state;
      }else {
        const {key, value, elementId} = action;
        const items = map(state.items, item => {
          if(item.elementId === elementId){
            item[key] = value;
          }
          return item;
        })
        return {...state, items}
      }
    case ACTIONS.ADD_ELEMENT:
      if(action.elementType) {
        const {elementType} = action;
        return {...state, items: state.items.concat([createElement(state.items.length, elementType)])}
      }
      return state;
    case ACTIONS.REM_ELEMENT:
      if(action.elementId) {
        return {...state, items: state.items.filter(item => item.elementId !== action.elementId)}
      }
      return state;
    case ACTIONS.ADD_OPTION:
      if(action.elementId) {
        const {elementId, value} = action;
        const result = Array.from(state.items);
        return {...state, items: result.map((item) => (item.elementId === elementId ? {...item, formElementValues: item.formElementValues.concat([createOption(item.formElementValues.length, value)])} : item))}
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

function FormBuilder() {

  const [state, dispatch] = useReducer(reducer, init());

  const onAddElement = (elementType)=> dispatch({type: ACTIONS.ADD_ELEMENT, elementType})
  const onRemElement = (elementId)=> dispatch({type: ACTIONS.REM_ELEMENT, elementId})
  const onChangeValue = (elementId) => (key) => (value) => {dispatch({type: ACTIONS.CHANGE_VALUE, key, value, elementId})}

  const onDragEnd = (result) => {
    if(result.type === TYPES.MAIN){
      dispatch({type: ACTIONS.DRAG_END, result})
    }
    else {
      dispatch({type: ACTIONS.OPTION_DRAG_END, result})
    }
  }

  const onToggle = (elementId) => dispatch({type: ACTIONS.CHANGE_EDIT_MODE, elementId})
  const onAddOption = (elementId, value) => dispatch({type:ACTIONS.ADD_OPTION, elementId, value})

  return(
    <div className="container">
      <Form items={state.items} onDragEnd={onDragEnd} onRemElement={onRemElement} onChangeValue={onChangeValue} editMode={state.editMode} onToggle={onToggle} onAddOption={onAddOption} />
      <div className="container text-center">
        <ul className="list-inline mt-5">
          <li className="list-inline-item text-center mr-5" onClick={()=> onAddElement(ELEMENT_TYPE.PRINT)}><i className="fas fa-print fa-2x"></i><div className="small">Print</div></li>
          <li className="list-inline-item text-center mr-5" onClick={()=> onAddElement(ELEMENT_TYPE.TEXT)}><i className="fas fa-font fa-2x"></i><div className="small">Text</div></li>
          <li className="list-inline-item text-center mr-5" onClick={()=> onAddElement(ELEMENT_TYPE.TEXTAREA)}><i className="fas fa-paragraph fa-2x"></i><div className="small">Text Area</div></li>
          <li className="list-inline-item text-center mr-5" onClick={()=> onAddElement(ELEMENT_TYPE.PASSWORD)}><i className="fas fa-key fa-2x"></i><div className="small">Password</div></li>
          <li className="list-inline-item text-center mr-5" onClick={()=> onAddElement(ELEMENT_TYPE.CHECKBOX)}><i className="fas fa-check-square fa-2x"></i><div className="small">Checkbox</div></li>
          <li className="list-inline-item text-center mr-5" onClick={()=> onAddElement(ELEMENT_TYPE.RADIO)}><i className="fas fa-check-circle fa-2x"></i><div className="small">Radio</div></li>
          <li className="list-inline-item text-center" onClick={()=> onAddElement(ELEMENT_TYPE.SIMPLE_SELECT)}><i className="far fa-caret-square-down fa-2x"></i><div className="small">Select</div></li>
        </ul>
      </div>
    </div>
  )
}

export default FormBuilder;