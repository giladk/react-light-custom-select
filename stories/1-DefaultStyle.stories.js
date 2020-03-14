import React, { useState } from 'react';
import {Select} from '../src';
import {optionsShort, optionsShortString, optionsLong, optionsLongString} from './constants';
import {rowStlye, descriptionStyle, preStyle, boxStyle, boxDescriptionStyle} from './styles';
import {SimpleSelectsRow} from './components';

export default {
  title: 'Default style',
};


export const noProps = () => {
  return(
  <div>
    <div style={descriptionStyle}>
      Default use without any props ( only options )
    </div>
    <SimpleSelectsRow />
  </div>
  )
};

export const placeholder = () => {
  return(
  <div>
    <div style={descriptionStyle}>
      placeholder={`{'Please select'}`}
    </div>
    <SimpleSelectsRow placeholder={'Please select'}/>
  </div>
  )
};
placeholder.story = {
  name:"placeholder"
}

export const closeOnOutClick = () => (
  <div>
    <div style={descriptionStyle}>
      Close on click outside the menu, default: true
      <pre style={preStyle}>{`<Select options={options} closeOnOutClick={false} />`}</pre>
    </div>
    {/* <div style={descriptionStyle}>
        {`closeOnOutClick={false}`}
    </div> */}
    <SimpleSelectsRow closeOnOutClick={false}/>
  </div>
);
closeOnOutClick.story = { name:"closeOnOutClick" }

export const closeOnSelectOption = () => (
  <div>
    {/* <div style={descriptionStyle}>
        {`closeOnSelectOption={false}`}
    </div> */}
    <SimpleSelectsRow closeOnSelectOption={false}/>
  </div>
);

closeOnSelectOption.story = {
  name:"closeOnSelectOption"
}

