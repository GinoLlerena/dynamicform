import React, { useState} from "react"
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

export default function FormManagement(props){

  const [valMap, setValMap] = useState({});

  function setValueElement(id, value){
    setValMap(set(valMap,id, value));
  }

  const elements = map( values(getElements(form.formElements)), (element, index) => {
    return (
      <FormElementComponent key={index}
                            element={element}
                            setValue={setValueElement}
                            valueMap={valMap}
      />)
  })

  return(
    <form>
      {elements}
      <div className="form-group" style={{paddingTop:'2em'}}>
        <div className="text-center">
          <button type="submit" value="Post" className="btn btn-success">Send</button>
        </div>
      </div>
    </form>
  )
}


