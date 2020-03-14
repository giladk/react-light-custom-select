import React from 'react';
import {Select} from '../src';
import {optionsShort, optionsShortString, optionsLong, optionsLongString} from './constants';
import {rowStlye, descriptionStyle, boxStyle, boxDescriptionStyle} from './styles';
import {SimpleSelectsRow} from './components';

export default {
  title: 'Custom style',
};

const controlCustomStlyles = {
  control: {
    borderColor:'red',
    color:'green',
    // fontSize:'24px',
    // padding:'4px 8px'
    // border: '1px solid red'
  }
}

const controlCustomStlylesFunction = {
  control: (base,props) => {
    return{
      ...base,
      border:`${props.isControlHovered || props.isFocused ? '4' : '1'}px dashed ${props.isControlHovered || props.isFocused ? 'red' : 'orange'}`,
      padding:`${props.isControlHovered || props.isFocused ? '5' : '8'}px`,
      color:`${props.hasValue ? 'green' : 'black'}`,
      transition:'all 0.4s'
    }
  }
}

const indicatorCustomStlyles = {
  indicatorWrapper: {
    // paddingRight:'24px'
  },
  indicator: {
    borderColor:'red',
    // color:'green'
    // border: '1px solid red'
  }
}

const indicatorCustomStlylesFunction = {
  indicator: (base,props) => {
    return{
      ...base,
      borderColor:`${props.menuIsOpen ? 'green' : 'blue'}`,
      width:'20px',
      height:'20px',
      marginTop: `${props.menuIsOpen ? '0' : '-6'}px`,
      marginBottom: `${props.menuIsOpen ? '-6' : '0'}px`,
      transition:'all 0.3s'
    }
  }
}

const menuCustomStlyles = {
  menu: {
    // borderColor:'red'
    border: '3px dashed red'
  }
}

const menuCustomStlyles2 = {
  menu: {
    padding:'24px',
    marginTop:'10px',
    borderRadius:'0px',
    backgroundColor:'#e3e3e3'
  }
}



const menuCustomStlylesFunction = {
  menu: (base,props) => {
    return{
      ...base,
      border:`${props.isSelectHovered ? '4' : '1'}px dashed red`,
      // padding:`${props.isSelectHovered ? '5' : '8'}px`,
      transition:'all 0.4s'
    }
  }
}

const optionCustomStlyles = {
  menu: {
    // borderColor:'red'
    border: '2px solid purple'
  },
  option: {
    default: {
      color: 'red',
      backgroundColor: 'yellow'
    },
    focused : {
      color: 'blue',
      backgroundColor: 'pink'
    },
    selected: {
      color: 'pink',
      backgroundColor: 'blue',
      fontSize:'20px'
    },
    focusedSelected:{
      backgroundColor: 'green',
    }
  }
}

const optionCustomStlylesFunction = {
  option: (base,props) => {
    return{
      ...base,
      border:`${props.isFocused ? '4' : '1'}px solid ${props.isSelected ? 'red' : 'orange'}`,
      padding:`${props.isSelected ? '5' : '8'}px`,
      transition:'all 0.4s'
    }
  }
}

export const control = () => (
  <div>
    {/* <div style={descriptionStyle}>
      Default use without any props ( only options ) <br/>
    </div> */}
    <SimpleSelectsRow customStyle={controlCustomStlyles}/>
    <SimpleSelectsRow customStyle={controlCustomStlylesFunction} />
  </div>
);
control.story = {
  name:"control"
}

export const indicator = () => (
  <div>
    <SimpleSelectsRow customStyle={indicatorCustomStlyles} />
    <SimpleSelectsRow customStyle={indicatorCustomStlylesFunction} />
  </div>
);
indicator.story = {
  name:"indicator"
}

export const menu = () => (
  <div>
    <SimpleSelectsRow customStyle={menuCustomStlyles}/>
    <SimpleSelectsRow customStyle={menuCustomStlyles2} />
    <SimpleSelectsRow customStyle={menuCustomStlylesFunction}/>
  </div>
);
menu.story = {
  name:"menu"
}

export const option = () => (
  <div>
    <SimpleSelectsRow customStyle={optionCustomStlyles} closeOnOutClick={false}/>
    <SimpleSelectsRow customStyle={optionCustomStlylesFunction} />
  </div>
);
option.story = {
  name:"option"
}


// closeOnOutClick.story = {
//   name:"closeOnOutClick"
// }

