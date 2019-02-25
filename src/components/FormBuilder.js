
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

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

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class FormItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


function FormBuilder() {

  return(
    <div className="container text-center">
      <FormItems />
      <ul className="list-inline">
        <li className="list-inline-item text-center mr-5"><i className="fas fa-print fa-2x"></i><div className="small">Print</div></li>
        <li className="list-inline-item text-center mr-5"><i className="fas fa-font fa-2x"></i><div className="small">Text</div></li>
        <li className="list-inline-item text-center mr-5"><i className="fas fa-paragraph fa-2x"></i><div className="small">Text Area</div></li>
        <li className="list-inline-item text-center mr-5"><i className="fas fa-key fa-2x"></i><div className="small">Password</div></li>
        <li className="list-inline-item text-center mr-5"><i className="fas fa-check-square fa-2x"></i><div className="small">Checkbox</div></li>
        <li className="list-inline-item text-center mr-5"><i className="fas fa-check-circle fa-2x"></i><div className="small">Radio</div></li>
        <li className="list-inline-item text-center"><i className="far fa-caret-square-down fa-2x"></i><div className="small">Select</div></li>
      </ul>
    </div>
  )
}

export default FormBuilder;