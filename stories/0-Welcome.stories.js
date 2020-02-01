import React, { useState } from 'react';
import {Select} from '../src';
import {optionsShort, optionsShortString, optionsLong, optionsLongString} from './constants';
import {rowStlye, descriptionStyle, boxStyle, boxDescriptionStyle} from './styles';
import {SimpleSelectsRow} from './components';

export default {
  title: 'Default style',
};


export const noProps = () => {
  const [selectValue,setSelectValue] = useState(null);
  return(
  <div>
    <div style={descriptionStyle}>
      Default use without any props ( only options ) {selectValue} <br/>
    </div>
    <SimpleSelectsRow showOptions onSelect={(option)=>{setSelectValue(option.value)}}/>
  </div>
  )
};

export const closeOnOutClick = () => (
  <div>
    <div style={descriptionStyle}>
        {`closeOnOutClick={false}`}
    </div>
    <SimpleSelectsRow closeOnOutClick={false}/>
  </div>
);
closeOnOutClick.story = { name:"closeOnOutClick" }

export const closeOnSelectOption = () => (
  <div>
    <div style={descriptionStyle}>
        {`closeOnSelectOption={false}`}
    </div>
    <SimpleSelectsRow closeOnSelectOption={false}/>
  </div>
);

closeOnSelectOption.story = {
  name:"closeOnSelectOption"
}

