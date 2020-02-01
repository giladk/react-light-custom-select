import React from 'react';
import {Select} from '../src';
import {optionsShort, optionsShortString, optionsLong, optionsLongString} from './constants';
import {rowStlye, descriptionStyle, boxStyle, boxDescriptionStyle} from './styles';

export default {
  title: 'Custom style',
};

const customOptionComponent = (props) => { 
  console.log(props);
  return(
  <div style={{display:'flex',backgroundColor:props.isSelected ?  '#eee': props.isFocused ? '#eee' : '#fff'}}>
    <div style={{marginRight:24}}>
      <div style={{width:'56px',height:56,boxShadow:'2px 2px 4px 1px #717171', backgroundColor:props.isSelected ?  '#6d0013': 'pink',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{fontSize:'18px'}}>{props.av}</div>
      </div>
    </div>
    <div style={{display:'flex',flexDirection:'column',flex:1,justifyContent:'center'}}>
        <div>{props.u}</div>
        <div>{props.e}</div>
    </div>
  </div>
  )
};

const itemRenderFuncOne = (props) => {
  console.log(props);
  return(
    <div style={{display:'flex',backgroundColor:props.isSelected ?  '#eee': props.isFocused ? '#eee' : '#fff'}}>
      <div style={{marginRight:24}}>
        <div style={{width:'56px',height:56,boxShadow:'2px 2px 4px 1px #717171', backgroundColor:props.isSelected ?  '#6d0013': 'pink',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{fontSize:'18px'}}>{props.av}</div>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',flex:1,justifyContent:'center'}}>
          <div>{props.u}</div>
          <div>{props.e}</div>
      </div>
    </div>
    )
}




const optionsComp = [
  { value: '1000324', label: 'p' , component: (selectValues) => customOptionComponent({...selectValues,u:'Phil chan',e:'philchan@domain.com',av:'PC'}) },
  { value: '1000325', label: 'm' , component: (selectValues) => customOptionComponent({...selectValues,u:'Mark malkovich',e:'markmalkovich@domain.com',av:'MM'}) },
  { value: '1000326', label: 'm' , u:'Mark malkovich',e:'markmalkovich@domain.com',av:'MM'},
  { value: '1000327', label: 'm' , u:'Mark malkovich',e:'markmalkovich@domain.com',av:'MM'},
  { value: '1000328', label: 'm' , u:'Mark malkovich',e:'markmalkovich@domain.com',av:'MM'},
  { value: '1000329', label: 'm' , u:'Mark malkovich',e:'markmalkovich@domain.com',av:'MM'}
  // { value: '1000326', label: 'c' , component: customOptionComponent({u:'Mark malkovich',e:'markmalkovich@domain.com',av:'MM'}) },
  // { value: '1000327', label: 'c' , component: customOptionComponent() },
  // { value: '1000328', label: 'a' , component: customOptionComponent() },
  // { value: '1000329', label: 'b' , component: customOptionComponent() },
  // { value: '10003210', label: 'c' , component: customOptionComponent() },
  // { value: '10003211', label: 'c' , component: customOptionComponent() }
];




export const noProps = () => (
  <div>
    <div style={descriptionStyle}>
      Default use without any props ( only options ) <br/>
    </div>
    <div style={rowStlye}>
      <div style={boxStyle}>
        <Select options={optionsShort}></Select>
        <div style={boxDescriptionStyle} >
          <pre>{optionsShortString}</pre>
        </div>
      </div>
      <div style={boxStyle}>
        <Select options={optionsLong}></Select>
        <div style={boxDescriptionStyle} >
          <pre>{optionsLongString}</pre>
        </div>
      </div>
    </div>
  </div>
);

export const closeOnOutClick = () => (
  <div>
    <div style={descriptionStyle}>
      
      </div>
    <div style={rowStlye}>
      <div style={boxStyle}>
        <Select options={optionsShort}></Select>
      </div>
      <div style={boxStyle}>
        <Select options={optionsComp} itemRender={itemRenderFuncOne} closeOnOutClick={false} closeOnSelectOption={false}></Select>
      {/* <Select options={optionsComp} isOpen closeOnSelectOption={false}></Select> */}
      </div>
    </div>

    <div style={rowStlye}>
      <div style={boxStyle}>
      <Select options={optionsShort} closeOnOutClick={false}></Select>
      </div>
      <div style={boxStyle}>
      <Select options={optionsComp} itemRender={itemRenderFuncOne}></Select>
      </div>
    </div>

  </div>
);

closeOnOutClick.story = {
  name:"closeOnOutClick"
}

