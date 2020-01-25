import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import {getItemStyle} from "../../utils/FormUtils";

export function DraggableItem(props) {
  const {draggableId, index} = props

  return(
    <Draggable draggableId={draggableId} index={index}>
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
          {props.children}
        </div>
      )}
    </Draggable>
  )
}
