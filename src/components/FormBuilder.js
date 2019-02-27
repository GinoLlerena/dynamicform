
import React, { useReducer } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import form from '../templates/data'
import FormElementComponent from "../form/FormElementComponent";
import FormEditElement from "../form/FormEditElement"
import map from 'lodash/map'
import {ELEMENT_TYPE, ACTIONS} from '../constants/contants'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  minHeight: 120,


  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid
});


function createOption(index){

  const elementvalueId = (new Date().getTime()).toString();

  return({
    "displayName": "",
    "displayOrder": index,
    "elementvalueId": elementvalueId
    })
}

function createElement(index, type){

  const elementId = (new Date().getTime()).toString();

  return(
    {
      "displayName": "",
      "displayOrder": index,
      "required": false,
      "elementId": elementId,
      "type": type,
      "readOnly": false,
      "isHidden": () => (false),
      "formElementValues": []
    }
  )
}


function FormItems({items, onRemElement, onChangeValue}) {


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
          <FormEditElement key={item.elementId} element={item} onRemElement={()=>onRemElement(item.elementId)} onChange={onChangeValue(item.elementId)} />
        </div>
      )}
    </Draggable>
  )) : null;

  return list;
}



  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
function Form(props) {
    const {onDragEnd, items, onRemElement, onChangeValue} = props;


    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <FormItems items={items} onRemElement={onRemElement} onChangeValue={onChangeValue} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

function init() {
  return {items: map(form.formElements, element => ({...element, readOnly:true}))};
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
        return {items}
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

        return {items}
      }
    case ACTIONS.ADD_ELEMENT:
      if(action.elementType) {
        const {elementType} = action;
        return {items: state.items.concat([createElement(state.items.length, elementType)])}
      }
      return state;
    case ACTIONS.REM_ELEMENT:
      if(action.elementId) {
        return {items: state.items.filter(item => item.elementId !== action.elementId)}
      }
      return state;
    case ACTIONS.ADD_OPTION:
      if(action.type) {
        const {index} = action;
        const result = Array.from(state.items);
        return {items: result.map((item,i) => (i === index ? {...item, formElementValues: item.formElementValues.concat([createOption(item.formElementValues.length)])} : item))}
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
  const onChangeValue = (elementId) => (key) => (value) => {console.log('value',value); debugger;  dispatch({type: ACTIONS.CHANGE_VALUE, key, value, elementId})}

  return(
    <div className="container">
      <Form items={state.items} onDragEnd={(result) => dispatch({type: ACTIONS.DRAG_END, result})} onRemElement={onRemElement} onChangeValue={onChangeValue} />
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