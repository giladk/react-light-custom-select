import React , {useState, useEffect, useRef, useImperativeHandle } from 'react';
import { getComponentStyle, getNewFocusedOptionIndex , getScrollPositionForOption } from './functions';
import {getWrapperStyle, getControlStyle, getValueWrapperStyle, getValueStyle, getIndecatorWrapperStyle, getIndecatorStyle, getMenuWrapperStyle, getOptionWrapperStyle} from './styles/components.styles';

export const Select = React.forwardRef((props, ref) => { 

    const {options,placeholder,value,onSelect,afterMenuIsOpen,isOpen,itemRender,components,customStyle,closeOnOutClick,closeOnSelectOption} = props;

    const [menuIsOpen, setMenuIsOpen] = useState(isOpen); // we use menuIsOpen instead of isOpen, because isOpen is prop that make the select controled
    // if value is passed - search for the selected index
    const [selectedOptionIndex, setSelectedOptionIndex] = useState( options.findIndex(o=>o.value===value) );
    const [selectedOption, setSelectedOption] = useState( selectedOptionIndex !== -1 ? options[selectedOptionIndex] : null);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(selectedOptionIndex !== -1 ? selectedOptionIndex : 0);
    const [isSelectFocused, setIsSelectFocused] = useState(false);
    const [isNativeFocused, setIsNativeFocused] = useState(false);
    const [isSelectHovered, setIsSelectHovered] = useState(false);
    const [isControlHovered, setIsControlHovered] = useState(false);
    
    const menuWrapperRef = useRef(null);
    const controlRef = useRef(null);
    // const menuRef = useRef(null);
    const optionsRefs = useRef(options.map( (option)=> React.createRef()));
    
    const handleWrapperMouseEnter = () => {
        setIsSelectHovered(true);
    }

    const handleWrapperMouseLeave = () => {
        setIsSelectHovered(false);
    }

    const handleControlMouseEnter = () => {
        setIsControlHovered(true);
    }

    const handleControlMouseLeave = () => {
        setIsControlHovered(false);
    }

    const handleWrapperFocus = () => {
        // console.log("Focused");
        setIsNativeFocused(true);
    }

    const handleWrapperFocusOut = () => {
        // console.log("Blured")
        setIsNativeFocused(false);
        if (closeOnOutClick!==false){
            setMenuIsOpen(false);
        }
    }

    const handleControlClick = () => {
        setIsSelectFocused(!menuIsOpen);
        setMenuIsOpen(!menuIsOpen);
    }
    
    const handleOptionMouseEnter = (index) => {
        if (!isSelectFocused){
            setIsSelectFocused(true);
        }
        setFocusedOptionIndex(index);
    }

    const handleOptionClick = (option,index) => {
        if (!value){
            setSelectedOption(option);
            setSelectedOptionIndex(index);
        }
        if (onSelect){
            onSelect(option);
        }
        if (closeOnSelectOption!==false){
            setMenuIsOpen(false);
            setIsSelectHovered(false);
        }
    }
    const handlDocumentClick = (e) => {
        // console.log("Document click");
        if (menuWrapperRef.current && !menuWrapperRef.current.contains(e.target)){
            // console.log("handle out menu click");
            setIsSelectFocused(false);
            if (closeOnOutClick!==false){
                setMenuIsOpen(false);
            }
        }
    }

    const handlKeyDown = (e) => {
        // console.log("Key down", e);
        if (!isSelectFocused && !isNativeFocused){return;}
        if (e.keyCode === 13){
            // Enter
            if (isNativeFocused && !menuIsOpen){
                setMenuIsOpen(true)
            }else {
                handleOptionClick(options[focusedOptionIndex],focusedOptionIndex)
            }
        } else if (menuIsOpen && e.keyCode !== 9 && e.code !== 'Tab') {
            const newFocusedIndex = getNewFocusedOptionIndex(e.keyCode,e.key,options,focusedOptionIndex);
            if (newFocusedIndex !== -1){
                // console.log(newFocusedIndex)
                setFocusedOptionIndex(newFocusedIndex);
                scrollToOptionPosition(newFocusedIndex);
            }
            e.preventDefault();  
        }
    }

    const scrollToOptionPosition = (optionIndex) => {
        const optionRef = optionsRefs.current[optionIndex].current;
        if (optionRef !== null){
            menuWrapperRef.current.scrollTop = getScrollPositionForOption(menuWrapperRef.current,optionRef);
        }
    }

    useEffect(() => {
        if (isNativeFocused || (menuIsOpen && isSelectFocused)){
            // console.log("Register to keydown")
            document.addEventListener('keydown',handlKeyDown);
        }
        return () => {
            // console.log("Remove keydown listenr")
            document.removeEventListener('keydown',handlKeyDown);
        };
    }, [menuIsOpen,focusedOptionIndex,isSelectFocused,isNativeFocused]) 

    useEffect(() => {
        if (menuIsOpen && isSelectFocused){
            // console.log("Register to click")
            document.addEventListener('click',handlDocumentClick);
        }
        return () => {
            // console.log("Remove click listenr")
            document.removeEventListener('click',handlDocumentClick);
        };
    }, [menuIsOpen,isSelectFocused])

    useEffect(()=>{
        if (menuIsOpen){
            scrollToOptionPosition(focusedOptionIndex);
            if (afterMenuIsOpen){
                afterMenuIsOpen({controlRef,menuRef:menuWrapperRef});
            }
        }
    },[menuIsOpen])


    useEffect(()=>{
        const newSelectedOptionIndex = options.findIndex(o=>o.value===value);
        setSelectedOptionIndex(newSelectedOptionIndex);
        setSelectedOption(newSelectedOptionIndex !== -1 ? options[newSelectedOptionIndex] : null);
        setFocusedOptionIndex(newSelectedOptionIndex !== -1 ? newSelectedOptionIndex : 0);
    },[value])

    const baseStylesProps = {menuIsOpen,isSelectHovered,isControlHovered,isFocused:isNativeFocused};

    const wrapperStyle = getComponentStyle(baseStylesProps,getWrapperStyle,customStyle && customStyle.wrapper ? customStyle.wrapper : {},true)
    const controlStyle = getComponentStyle({...baseStylesProps,hasValue:selectedOption? true : false},getControlStyle,customStyle && customStyle.control ? customStyle.control : {},true);
    const valueWrapperStyle = getComponentStyle(baseStylesProps,getValueWrapperStyle,customStyle && customStyle.valueWrapper ? customStyle.valueWrapper : {},true);
    const valueStyle = getComponentStyle(baseStylesProps,getValueStyle,customStyle && customStyle.value ? customStyle.value : {},true);
    const indecatorWrapperStyle = getComponentStyle(baseStylesProps,getIndecatorWrapperStyle,customStyle && customStyle.indicatorWrapper ? customStyle.indicatorWrapper : {},true);
    const indicatorStyle = getComponentStyle(baseStylesProps,getIndecatorStyle,customStyle && customStyle.indicator ? customStyle.indicator : {},true);

    const menuStyleProps = { isSelectHovered,isControlHovered,isFocused:isNativeFocused };
    const menuStyle = getComponentStyle(menuStyleProps,getMenuWrapperStyle,customStyle && customStyle.menu ? customStyle.menu : {},true);

    

    // const controlStyleProps = {menuIsOpen,isSelectHovered,isControlHovered,isFocused:isNativeFocused,hasValue:selectedOption? true : false}
    //const controlStyle = getComponentStyle(controlStyleProps,getControlStyle,customStyle && customStyle.control ? customStyle.control : {},true);

    return (
        <div tabIndex="0" style={wrapperStyle} onFocus={handleWrapperFocus} onBlur={handleWrapperFocusOut} onMouseEnter={handleWrapperMouseEnter} onMouseLeave={handleWrapperMouseLeave} >
            <div ref={controlRef} onClick={handleControlClick} onMouseEnter={handleControlMouseEnter} onMouseLeave={handleControlMouseLeave}>
                { components && components.control ? 
                    components.control({menuIsOpen,selectedOption}):
                    <div style={controlStyle}>
                        <div style={valueWrapperStyle}>
                            <div style={valueStyle} >{selectedOption ? selectedOption.label : (placeholder || 'Select...') }</div>
                        </div>    
                        <div style={indecatorWrapperStyle}>
                            <span style={indicatorStyle} ></span>
                        </div>
                    </div> 
               }
            </div>
            { menuIsOpen && 
                <div style={menuStyle} ref={menuWrapperRef}>
                    {options.map((option,ind)=>{
                        const styleProps = {
                            isFocused:ind===focusedOptionIndex,
                            isSelected:ind===selectedOptionIndex,
                            isFirst:ind===0,
                            isLast:ind===options.length-1
                        }
                        // console.log(itemRender);
                        return(
                            <div key={ind} ref={optionsRefs.current[ind]}
                                 onMouseEnter={()=>{handleOptionMouseEnter(ind)}}
                                 onClick={()=>{handleOptionClick(option,ind)}}>
                            <SelectOption
                                {...styleProps}
                                customStyle={customStyle && customStyle.option ? customStyle.option : {}}
                                option={option}
                                itemRenderFunction={itemRender || false}
                            />
                            </div>
                    )})}
                </div>
            }
        </div>
    )
});

const SelectOption = React.memo((props) => {
    const {option,itemRenderFunction,customStyle,...styleProps} = props;
    const optionStyle = getComponentStyle(styleProps,getOptionWrapperStyle,customStyle,false);

    return (
    <div >
          {
            typeof option.component === 'function' ? option.component({...styleProps}) : 
            (itemRenderFunction ? itemRenderFunction({...option,...styleProps}):
            <div style={optionStyle}>
                {option.component ? ( typeof option.component === 'function' ? option.component({...styleProps}) : option.component ) : option.label}
            </div>)
          }                      
    </div>)
});

