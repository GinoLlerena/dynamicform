import React from 'react'
import {ELEMENT_TYPE} from '../constants/contants'
import map from 'lodash/map'
import keys from 'lodash/keys'
import upperFirst from 'lodash/upperFirst'


function getOptions(){
  return map(keys(ELEMENT_TYPE), (key,i)=> <option key={key} value={ELEMENT_TYPE[key]} >{upperFirst(key.toLowerCase())} </option>)
}


function FormEditElement(props) {

  const {element, onRemElement, onChange} = props;

  const onChangeDisplayName = onChange('displayName')
  const onChangeType = onChange('type')

  return(
    <div className="card" >
      <div className="card-header">
        Featured
        <div className="float-right">
          <span className="ml-auto px-2"><i className="far fa-edit"></i></span>
          <span className="ml-auto px-2" onClick={onRemElement}><i className="fas fa-trash"></i></span>
        </div>
      </div>
      <div className="card-body">
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
            </form>
          </div>
          <div className="col-md-4">
          </div>
        </div>
      </div>
    </div>
  )

}

export default FormEditElement;