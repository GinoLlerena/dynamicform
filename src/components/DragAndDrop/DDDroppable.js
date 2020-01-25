import React from 'react';
import { Droppable} from "react-beautiful-dnd";
import {getListStyle} from "../../utils/FormUtils";


export function DDDroppable(props) {
  const { droppableId, type} = props;

  return (
      <Droppable droppableId={droppableId} type={type}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  );
}
