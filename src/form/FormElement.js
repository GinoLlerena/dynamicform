import React from 'react'
import map from 'lodash/map'
import get from 'lodash/get'

export const RadioOption = ({item, currentValue, handleChange, readOnly}) => {
  return (
    <div className="form-check">
      <input className="form-check-input" type="radio" id={item.elementvalueId} disabled={readOnly}
             value={item.elementvalueId} checked={item.elementvalueId === currentValue} onChange={handleChange}/>
      <label className="form-check-label" htmlFor={item.elementvalueId}>
        {item.displayName}
      </label>
    </div>
  )
}

function getOptionList(formElementValues){
  const list = formElementValues && formElementValues.length ? map(formElementValues, (item) => {
    return(
      <option key={item.elementvalueId} value={item.elementvalueId}>{item.displayName}</option>
    )
  }) : null;

  return list;
}

export const SimpleSelectElement = (props) => {

  const {valueMap, element, handleChange} = props;
  const {formElementValues} = element;

  return(
    <div className="form-group">
      <label htmlFor={element.elementId}>{element.displayName}</label>
      <select className="form-control" id={element.elementId} value={get(valueMap, element.elementId)} disabled={element.readOnly} onChange={handleChange}>
        {getOptionList(formElementValues)}
      </select>
    </div>
  )
}

export const PasswordElement = (props) => {
  const {valueMap, element, handleChange} = props;
  return(
    <div className="form-group">
      <label htmlFor={element.elementId}>{element.displayName}</label>
      <input type="password" className="form-control" id={element.elementId} defaultValue={get(valueMap, element.elementId)} placeholder="Password" onChange={handleChange} disabled={element.readOnly} />
    </div>
  )
}

export const CheckboxElement = (props) => {
  const {valueMap, element, handleChange} = props;

    return (
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" defaultChecked={get(valueMap, element.elementId)} onChange={handleChange} disabled={element.readOnly} className="form-check-input"/> <span>{element.displayName}</span>
        </label>
      </div>
  )
}

export const PrintElement = (props) => {
  const {element} = props;
  return(
    <div className="form-group">
      <label htmlFor="formControlRange">{element.displayName}</label>
    </div>
  )
}



export const TextElement = (props) => {

  const {valueMap, element, handleChange} = props;

  return(
    <div className="form-group">
      <label htmlFor={element.elementId}>{element.displayName}</label>
      <input type="text" className="form-control" autoComplete="off" name={element.elementId} id={element.elementId} onChange={handleChange} defaultValue={get(valueMap, element.elementId)} disabled={element.readOnly}  required=""/>
        <div className="invalid-feedback">Please enter your username or email</div>
    </div>
  )
}

export const TextAreaElement = (props) => {

  const {valueMap, element, handleChange} = props;

  return(
    <div className="form-group">
      <label htmlFor={element.elementId}>{element.displayName}</label>
      <textarea className="form-control" id={element.elementId} defaultValue={get(valueMap, element.elementId)} disabled={element.readOnly} onChange={handleChange} rows="3"></textarea>
    </div>
  )
}


export const RadioElement = (props) => {

  const {valueMap, element, handleChange} = props;
  const {formElementValues} = element;
  const currentValue = get(valueMap, element.elementId);
  const list = formElementValues && formElementValues.length ? map(formElementValues, (item) => <RadioOption key={item.elementvalueId} item={item}  currentValue={currentValue} handleChange={handleChange} readOnly={element.readOnly} />) : null;

  return(
    <fieldset className="form-group">
      <div className="row">
        <legend className="col-form-label col-sm-2 pt-0">{element.displayName}</legend>
        <div className="col-sm-10">
          {list}
        </div>
      </div>
    </fieldset>
  )
}
