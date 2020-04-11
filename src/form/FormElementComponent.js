import React from 'react'
import {ELEMENT_TYPE} from '../constants/contants'
import {TextElement, TextAreaElement, PrintElement, PasswordElement, CheckboxElement, RadioElement, SimpleSelectElement} from './FormElement'
import {shouldBeHidden} from '../utils/FormUtils'

const ElementDictionary = {
  [ELEMENT_TYPE.PRINT] :  PrintElement,
  [ELEMENT_TYPE.TEXT] : TextElement,
  [ELEMENT_TYPE.PASSWORD] : PasswordElement,
  [ELEMENT_TYPE.CHECKBOX] :  CheckboxElement,
  [ELEMENT_TYPE.RADIO]:  RadioElement,
  [ELEMENT_TYPE.TEXTAREA] :  TextAreaElement,
  [ELEMENT_TYPE.SIMPLE_SELECT] :  SimpleSelectElement
};

const FormElementComponent = (props) => {
  const {element, formElements, valueMap} = props;
  const MyReactElement = ElementDictionary[element.type];

  const handleChange = (event) => {
    const {element, setValue} = props;
    const value = getCurrentValue(event);
    setValue(element.elementId, value);
  }

  const getCurrentValue = (event) =>{

    const {element} = props;

    switch (element.type) {
      case ELEMENT_TYPE.RADIO:
        return event.target.value;
      case ELEMENT_TYPE.CHECKBOX:
        return event.target.checked;
      default:
        return event.target.value;
    }
  }

  const isHidden = shouldBeHidden(formElements, element, valueMap)

  if(isHidden){
    return null;
  }
  return (<MyReactElement handleChange={handleChange} {...props}  />)
}

export default FormElementComponent;

