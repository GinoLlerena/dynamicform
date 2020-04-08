import React from 'react';
import get from 'lodash/get'
import {DDDroppable} from "../components/DragAndDrop/DDDroppable";
import {DraggableItem} from "../components/DragAndDrop/DraggableItem";
import map from 'lodash/fp/map'
import entries from 'lodash/fp/entries'
import flow from 'lodash/fp/flow'
import cond from 'lodash/fp/cond'
import stubTrue from 'lodash/fp/stubTrue'

const getNull = _ => null;

function FormListOptions({formElementValues}) {

  const hasItems = (items) => items && items.length;

  const currentItem = ([index, item]) => (
    <DraggableItem key={item.elementvalueId} draggableId={item.elementvalueId} index={index}>
      <div className="form-group">
        <label htmlFor={item.elementvalueId}>Name</label>
        <input type="text" className="form-control" autoComplete="off" name={item.elementvalueId} id={item.elementvalueId} onChange={()=>{}} value={get(item, 'displayName')}  required=""/>
      </div>
    </DraggableItem>
  )

  return  cond([
    [hasItems, flow(entries, map(currentItem))],
    [stubTrue, getNull]
  ])(formElementValues)

}

function FormBuilderOptions(props) {
  const {formElementValues, type} = props;

  return (
      <DDDroppable droppableId={type} type={type}>
        <FormListOptions formElementValues={formElementValues}  />
      </DDDroppable>
  );
}

export default  FormBuilderOptions;
