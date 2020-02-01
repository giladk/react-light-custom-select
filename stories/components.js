import React from 'react';
import {Select} from '../src';
import {optionsShort, optionsShortString, optionsLong, optionsLongString} from './constants';
import {rowStlye, descriptionStyle, boxStyle, boxDescriptionStyle} from './styles';

export const SimpleSelectsRow = (props) => {
    const {showOptions, ...rest} = props;
    return (  
      <div style={rowStlye}>
        <div style={boxStyle}>
          <Select options={optionsShort} {...rest}></Select>
          {showOptions &&  <div style={boxDescriptionStyle} >
            <pre>{optionsShortString}</pre>
          </div>}
        </div>
        <div style={boxStyle}>
          <Select options={optionsLong} {...rest}></Select>
          {showOptions &&  <div style={boxDescriptionStyle} >
            <pre>{optionsLongString}</pre>
          </div>}
        </div>
      </div>
  )};
  