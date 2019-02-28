import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import get from 'lodash/get'
import {getItemStyle, getListStyle} from '../utils/FormUtils'

function FormListOptions({formElementValues}) {


  const list = formElementValues && formElementValues.length ? formElementValues.map((item, index) => (
    <Draggable key={item.elementvalueId} draggableId={item.elementvalueId} index={index}>
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
          <div className="form-group">
            <label htmlFor={item.elementvalueId}>Name</label>
            <input type="text" className="form-control" autoComplete="off" name={item.elementvalueId} id={item.elementvalueId} onChange={()=>{}} value={get(item, 'displayName')}  required=""/>
          </div>
        </div>
      )}
    </Draggable>
  )) : null;

  return list;

}

function FormBuilderOptions(props) {
  const {formElementValues, type} = props;

  return (
      <Droppable droppableId={type} type={type}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <FormListOptions formElementValues={formElementValues}  />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  );
}

export default  FormBuilderOptions;