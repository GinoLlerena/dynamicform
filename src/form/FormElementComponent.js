import React, { Component} from 'react'
import {ELEMENT_TYPE} from '../constants/contants'
import {TextElement, TextAreaElement, PrintElement, PasswordElement, CheckboxElement, RadioElement} from './FormElement'

const Mixing = InnerComponent => class extends Component {

  handleChange = (event) => {
    const {element, setValue} = this.props;
    const value = this.getCurrentValue(event);
    setValue(element.elementId, value);
  }

  getCurrentValue = (event) =>{

    const {element} = this.props;

    switch (element.type) {
      case 'radio':
        return event.target.value;
      case 'checkbox':
        return event.target.checked;
      default:
        return event.target.value;
    }
  }

  render() {
    return (<InnerComponent handleChange={this.handleChange} {...this.props} />);
  }

};



const MixingDictionary = {
  [ELEMENT_TYPE.PRINT] :  Mixing(PrintElement),
  [ELEMENT_TYPE.TEXT] : Mixing(TextElement),
  [ELEMENT_TYPE.PASSWORD] : Mixing(PasswordElement),
  [ELEMENT_TYPE.CHECKBOX] :  Mixing(CheckboxElement),
  [ELEMENT_TYPE.RADIO]: Mixing(RadioElement),
  [ELEMENT_TYPE.TEXTAREA] :  Mixing(TextAreaElement)
};

const FormElementComponent = (props) => {
  const {element} = props;
  const MyReactElement = MixingDictionary[element.type];

  return (<MyReactElement {...props}  />)
}

export default FormElementComponent;

