import React from 'react'
import map from 'lodash/map'
import get from 'lodash/get'

export const RadioOption = ({item, currentValue, handleChange}) => {
  return (
    <div className="form-check">
      <input className="form-check-input" type="radio" name="gridRadios" id={item.elementvalueId}
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
      <option key={item.elementvalueId}>{item.displayName}</option>
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
      <select className="form-control" id={element.elementId} value={get(valueMap, element.elementId)} onChange={handleChange}>
        {getOptionList(formElementValues)}
      </select>
    </div>
  )
}

export const PasswordElement = (props) => {
  const {valueMap, element, handleChange} = props;
  return(
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">{element.displayName}</label>
      <input type="password" className="form-control" id="exampleInputPassword1" value={get(valueMap, element.elementId)} placeholder="Password" onChange={handleChange} />
    </div>
  )
}

export const CheckboxElement = (props) => {
  const {valueMap, element, handleChange} = props;

    return (
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" checked={get(valueMap, element.elementId)} onChange={handleChange} className="form-check-input"/> <span>{element.displayName}</span>
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
      <label htmlFor="uname1">{element.displayName}</label>
      <input type="text" className="form-control" autoComplete="off" name="uname1" id="uname1" onChange={handleChange} value={get(valueMap, element.elementId)} required=""/>
        <div className="invalid-feedback">Please enter your username or email</div>
    </div>
  )
}

export const TextAreaElement = (props) => {

  const {valueMap, element, handleChange} = props;

  return(
    <div className="form-group">
      <label htmlFor="exampleFormControlTextarea1">{element.displayName}</label>
      <textarea className="form-control" id="exampleFormControlTextarea1" value={get(valueMap, element.elementId)} onChange={handleChange} rows="3"></textarea>
    </div>
  )
}


export const RadioElement = (props) => {

  const {valueMap, element, handleChange} = props;
  const {formElementValues} = element;
  const currentValue = get(valueMap, element.elementId);
  const list = formElementValues && formElementValues.length ? map(formElementValues, (item) => <RadioOption key={item.elementvalueId} item={item}  currentValue={currentValue} handleChange={handleChange} />) : null;

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