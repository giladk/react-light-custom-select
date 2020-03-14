import React, { useState } from 'react';
import {Select} from '../src';
import {optionsShort, optionsShortString, optionsLong, optionsLongString} from './constants';
import {wrapperStyle, rowStlye, titleStyle, descriptionStyle, boxStyle, preStyle, boxDescriptionStyle} from './styles';
import {SimpleSelectsRow} from './components';

export default {
  title: 'Welcome',
};


export const gettingStarted = () => {
  
  return(
  <div style={wrapperStyle}>
    <div style={titleStyle} >
      Getting started
    </div>
    <div style={descriptionStyle}>
      Install :
      <pre style={preStyle}>npm install --save react-light-custom-select</pre>
    </div>
    <div style={descriptionStyle}>
      Basic usage:      
      <pre style={preStyle}>
{`import {Select} from 'react-light-custom-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

<Select options={options} onSelect={(option)=>{console.log(option)}} />`}</pre>
    <div>
      <Select options={optionsShort} onSelect={(option)=>{console.log(option)}}/>
    </div>
</div>
  </div>
  )
};

// export const closeOnOutClick = () => (
//   <div>
//     <div style={descriptionStyle}>
//         {`closeOnOutClick={false}`}
//     </div>
//     <SimpleSelectsRow closeOnOutClick={false}/>
//   </div>
// );
// closeOnOutClick.story = { name:"closeOnOutClick" }

// export const closeOnSelectOption = () => (
//   <div>
//     <div style={descriptionStyle}>
//         {`closeOnSelectOption={false}`}
//     </div>
//     <SimpleSelectsRow closeOnSelectOption={false}/>
//   </div>
// );

// closeOnSelectOption.story = {
//   name:"closeOnSelectOption"
// }

