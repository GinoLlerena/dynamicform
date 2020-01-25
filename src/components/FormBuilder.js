
import React, { useReducer } from 'react';
import form from '../templates/data'
import FormEditElement from "../form/FormEditElement"
import map from 'lodash/fp/map'
import entries from 'lodash/fp/entries'
import flow from 'lodash/fp/flow'
import cond from 'lodash/fp/cond'
import reduce from 'lodash/fp/reduce'
import {ELEMENT_TYPE, ACTIONS, TYPES} from '../constants/contants'
import {DraggableItem} from "./DragAndDrop/DraggableItem";
import {DDDroppable} from "./DragAndDrop/DDDroppable";
import formBuilder from "../reducers/formBuilder";
import {DragDropContext} from "react-beautiful-dnd";

const getFalse = _ => false;
const getNull = _ => null;

function FormItems({items, onRemElement, onChangeValue, onDragEnd, editMode, onToggle, onAddOption}) {

  const hasItems = (items) => items && items.length;

  const currentItem = ([index, item]) => (
    <DraggableItem key={item.elementId} draggableId={item.elementId} index={parseInt(index)}>
      <FormEditElement key={item.elementId} element={item} onRemElement={() => onRemElement(item.elementId)}
                       onChange={onChangeValue(item.elementId)} onDragEnd={onDragEnd} editMode={editMode}
                       onToggle={onToggle} onAddOption={onAddOption}/>
    </DraggableItem>)

  return  cond([
                [hasItems, flow(entries, map(currentItem))],
                [getFalse, getNull]
              ])(items)

}

function Form(props) {
    const {onDragEnd, items, onRemElement, onChangeValue, editMode, onToggle, onAddOption} = props;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <DDDroppable droppableId="droppable" type={TYPES.MAIN}>
          <FormItems items={items} onRemElement={onRemElement} onChangeValue={onChangeValue} onDragEnd={onDragEnd} editMode={editMode} onToggle={onToggle} onAddOption={onAddOption} />
        </DDDroppable>
      </DragDropContext>
    )
  }

function init() {
  const getElement = element => ({...element, readOnly:true})
  const getEditMode = (result, element)=>{result[element.elementId] = false; return result;}
  return {
    items: map(getElement)(form.formElements),
    editMode: reduce(getEditMode, {})(form.formElements)
  };
}

function FormBuilder() {

  const [state, dispatch] = useReducer(formBuilder, init());

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
      <div className="row">
        <div className="col-8">
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
        <div className="col-4">
          <div><pre>{JSON.stringify(state.items, null, 2) }</pre></div>
        </div>
      </div>
    </div>
  )
}

export default FormBuilder;
