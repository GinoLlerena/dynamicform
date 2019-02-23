import React from 'react'
import map from 'lodash/map'
import get from 'lodash/get'

export const RadioOption = () => (
  <div className="form-check">
    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
    <label className="form-check-label" htmlFor="gridRadios1">
      First radio
    </label>
  </div>
)

export const PasswordElement = (props) => {
  const {valueMap, element} = props;
  return(
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">{element.displayName}</label>
      <input type="password" className="form-control" id="exampleInputPassword1" value={get(valueMap, element.elementId)} placeholder="Password"/>
    </div>
  )
}

export const CheckboxElement = (props) => {
  const {valueMap, element} = props;

    return (
      <div className="form-check small">
        <label className="form-check-label">
          <input type="checkbox" checked={get(valueMap, element.elementId)} className="form-check-input"/> <span>{element.displayName}</span>
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

  console.log('handleChange', handleChange);

  return(
    <div className="form-group">
      <label htmlFor="uname1">{element.displayName}</label>
      <input type="text" className="form-control" name="uname1" id="uname1" onChange={handleChange} value={get(valueMap, element.elementId)} required=""/>
        <div className="invalid-feedback">Please enter your username or email</div>
    </div>
  )
}

export const TextAreaElement = (props) => {

  const {valueMap, element} = props;

  return(
    <div className="form-group">
      <label htmlFor="exampleFormControlTextarea1">{element.displayName}</label>
      <textarea className="form-control" id="exampleFormControlTextarea1" value={get(valueMap, element.elementId)} rows="3"></textarea>
    </div>
  )
}


export const RadioElement = (props) => {

  const {formElementValues, valueMap, element} = props;
  const list = formElementValues && formElementValues.length ? map(formElementValues, (item) => <RadioOption key={item.elementvalueId} />) : null;

  return(
    <fieldset className="form-group">
      <div className="row">
        <legend className="col-form-label col-sm-2 pt-0">{get(valueMap, element.elementId)}</legend>
        <div className="col-sm-10">
          {list}
        </div>
      </div>
    </fieldset>
  )
}