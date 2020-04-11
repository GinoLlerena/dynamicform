import React from 'react'
import {ELEMENT_TYPE} from '../constants/contants'
import map from 'lodash/map'
import keys from 'lodash/keys'
import upperFirst from 'lodash/upperFirst'
import FormBuilderOptions from '../form/FormBuilderOptions'
import FormElementComponent from "../form/FormElementComponent";

function getOptions(){
  return map(keys(ELEMENT_TYPE), (key)=> <option key={key} value={ELEMENT_TYPE[key]} >{upperFirst(key.toLowerCase())} </option>)
}

function FormEditElement(props) {

  const {element, onRemElement, onChange, onDragEnd, editMode, onToggle, onAddOption} = props;
  let textInput = React.createRef();

  const onChangeDisplayName = onChange('displayName')
  const onChangeType = onChange('type')

  const handleKeyPress =(e) =>{
    if (e.key === 'Enter') {
      onAddOption(element.elementId, textInput.current.value);
      textInput.current.value = '';
    }
  }

  return(
    <div className="card" >
      <div className="card-header">
        Featured
        <div className="float-right">
          <span className="ml-auto px-2" onClick={()=>onToggle(element.elementId)}><i className="far fa-edit" style={{cursor:'pointer'}}></i></span>
          <span className="ml-auto px-2" onClick={onRemElement}><i className="fas fa-trash" style={{cursor:'pointer'}}></i></span>
        </div>
      </div>
      <div className="card-body">
        {!editMode[element.elementId] ? <FormElementComponent element={element} /> :
        <div className="row">
          <div className="col-md-8">
            <form>
              <div className="form-group">
                <label htmlFor="inputName">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter name" value={element.displayName} onChange={(e)=> onChangeDisplayName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="inputType">Type</label>
                <select className="form-control" id="inputType" value={element.type} onChange={(e)=>onChangeType(e.target.value)} >
                  {getOptions()}
                </select>
              </div>
              {element.type === ELEMENT_TYPE.SIMPLE_SELECT || element.type === ELEMENT_TYPE.RADIO ?
              <React.Fragment>
                <div className="form-group">
                  <FormBuilderOptions formElementValues={element.formElementValues} type={element.elementId} onDragEnd={onDragEnd}  />
                </div>
                <div className="form-group">
                  <input type="text" ref={textInput} className="form-control" id="inputName" placeholder="Enter name" onKeyPress={handleKeyPress}   />
                </div>
              </React.Fragment>
                : null}
            </form>
          </div>
          <div className="col-md-4">
          </div>
        </div>}
      </div>
    </div>
  )

}

export default FormEditElement;
