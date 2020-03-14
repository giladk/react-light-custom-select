import React, { useState } from 'react';
import {Select} from '../src';
import {optionsShort, optionsShortString, optionsLong, optionsLongString} from './constants';
import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';
import {rowStlye, descriptionStyle, boxStyle, boxDescriptionStyle} from './styles';
import {SimpleSelectsRow} from './components';

export default {
  title: 'Popper js',
};


export const usePopperJS = () => {
  const [selectValue,setSelectValue] = useState(null);

  const customStyle = {
    menu:{
      display:'none'
    }
  }
  const afterMenuIsOpen = ({controlRef,menuRef}) => {
    if (controlRef.current && menuRef.current){
      createPopper(controlRef.current, menuRef.current, {
        placement: 'bottom',
        modifiers: [preventOverflow, flip]
      });
      menuRef.current.style.display = 'block';
    }
  }

  return(
  <div>
    <div style={descriptionStyle}>
      Be default - the select will not use any positioning engine<br/>
      to keep the bundle size as small as possible,<br/>
      so it will always open on bottom with position absulute.<br/><br/>
      With popper you can get flip & overflow behviors
    </div>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <SimpleSelectsRow customStyle={customStyle} afterMenuIsOpen={afterMenuIsOpen}/>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <SimpleSelectsRow customStyle={customStyle} afterMenuIsOpen={afterMenuIsOpen}/>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
    <h2>some text to check flip</h2>
  </div>
  )
};