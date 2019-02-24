import React, { useReducer} from "react"
import FormElementComponent from '../form/FormElementComponent'
import keyBy from 'lodash/keyBy'
import orderBy from 'lodash/orderBy'
import set from 'lodash/set'
import map from 'lodash/map'
import values from 'lodash/values'
import form from '../templates/data'

function getElements(formElements){
  return  keyBy(orderBy(formElements, 'displayOrder','asc'),'elementId');
}


function ListElements(props){

  return map( values(getElements(form.formElements)), (element) => {
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
    <form>
      <div><pre>{JSON.stringify(state.valueMap, null, 2) }</pre></div>
      <ListElements valueMap={state.valueMap} setValue={(id, value) => dispatch({type: 'onChange', id, value})} />
      <div className="form-group" style={{paddingTop:'2em'}}>
        <div className="text-center">
          <button type="button" className="btn btn-success" onClick={()=> console.log('valueMap', state.valueMap)}>Send</button>
        </div>
      </div>
    </form>
  )
}


