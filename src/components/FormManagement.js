import React, { useReducer} from "react"
import FormElementComponent from '../form/FormElementComponent'
import orderBy from 'lodash/orderBy'
import set from 'lodash/set'
import get from 'lodash/get'
import map from 'lodash/map'
import some from 'lodash/some'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import reduce from 'lodash/reduce'
import form from '../templates/data'

function getElements(formElements, valueMap){

  const myFormElements = reduce(formElements, (result, element) => {
    let hidden = false;
    if (typeof element.isHidden === "boolean"){
      hidden = element.isHidden;
    } else if( isArray(element.isHidden)){
      hidden = !some(element.isHidden, item => !!(get(valueMap, item, false)))
    } else if(isFunction(element.isHidden)){
      hidden = element.isHidden(formElements, valueMap);
    } else{
      hidden = false;
    }
    if(hidden === false){
      result.push(element)
    }
    return result;
  }, [])

  return  orderBy(myFormElements, 'displayOrder','asc');
}


function ListElements(props){

  return map(getElements(form.formElements, props.valueMap), (element) => {
    return (
      <FormElementComponent key={element.elementId}
                            element={element}
                            setValue={props.setValue}
                            valueMap={props.valueMap}
      />)
  })
}


function init() {
  return {valueMap: {}};
}

function reducer(state, action) {
  switch (action.type) {
    case 'onChange':
      return {valueMap: set(state.valueMap, action.id, action.value)};
    default:
      throw new Error();
  }
}


export default function FormManagement(props){

  const [state, dispatch] = useReducer(reducer, init());

  return(
    <div className="container">
      <form>
        <div><pre>{JSON.stringify(state.valueMap, null, 2) }</pre></div>
        <ListElements valueMap={state.valueMap} setValue={(id, value) => dispatch({type: 'onChange', id, value})} />
        <div className="form-group" style={{paddingTop:'2em'}}>
          <div className="text-center">
            <button type="button" className="btn btn-success" onClick={()=> console.log('valueMap', state.valueMap)}>Send</button>
          </div>
        </div>
      </form>
    </div>
  )
}


