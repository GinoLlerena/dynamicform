const grid = 8;

export function createOption(index, value){

  const elementvalueId = (new Date().getTime()).toString();

  return({
    "displayName": value,
    "displayOrder": index,
    "elementvalueId": elementvalueId
  })
}

export function createElement(index, type){

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

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getItemStyle = (isDragging, draggableStyle) => ({
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


export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid
});