import React from 'react';
import {rowStlye, descriptionStyle, boxStyle, boxDescriptionStyle} from './styles';
import {SimpleSelectsRow} from './components';

export default {
  title: 'Components',
};

const customCompoments = {
  control: ({menuIsOpen,selectedOption})=>{
    return (<div>Custom control - {selectedOption ? selectedOption.label : 'Select...'} - {menuIsOpen ? "+" : '-'}</div>)
  }
}

export const control = () => (
  <div>
    <div style={descriptionStyle}>
      Default use without any props ( only options ) <br/>
    </div>
    <SimpleSelectsRow components={customCompoments}/>
  </div>
);
