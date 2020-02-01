import React , {useState, useEffect, useRef, useImperativeHandle } from 'react';
import { getNewFocusedOptionIndex } from './functions';
import {wrapperStyle, controlStyle, menuWrapperStyle, optionWrapperStyle, valueWrapperStyle, indecatorArrowStyle} from './styles/components.styles';



export const Select = React.forwardRef((props, ref) => { 

    const {options,isOpen,itemRender,closeOnOutClick,closeOnSelectOption} = props;

    const [menuIsOpen, setMenuIsOpen] = useState(isOpen); // we use menuIsOpen instead of isOpen, because isOpen is prop that make the select controled
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    // const [focusedOption, setFocusedOption] = useState(options[0]);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
    const [isSelectFocused, setIsSelectFocused] = useState(false);
    const [isNativeFocused, setIsNativeFocused] = useState(false);
    const [isSelectHovered, setIsSelectHovered] = useState(false);
    //const [optionsRefs, setOptionRefs] = useState([]);
    const menuWrapperRef = useRef(null);
    const optionsRefs = useRef(options.map( (option)=> React.createRef()));
    
    const handleWrapperMouseEnter = () => {
        setIsSelectHovered(true);
    }

    const handleWrapperMouseLeave = () => {
        setIsSelectHovered(false);
    }

    const handleWrapperFocus = () => {
        // console.log("Focused");
        setIsNativeFocused(true);
    }

    const handleWrapperFocusOut = () => {
        // console.log("Blured")
        setIsNativeFocused(false);
        setMenuIsOpen(false);
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
        setSelectedOption(option);
        setSelectedOptionIndex(index);
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
            // if close by property :
            // console.log(closeOnOutClick);
            if (closeOnOutClick!==false){
                setMenuIsOpen(false);
            }
            //  ;
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
        } else if (menuIsOpen && e.keyCode !== 9) {
            const newFocusedIndex = getNewFocusedOptionIndex(e.keyCode,e.key,options,focusedOptionIndex);
            if (newFocusedIndex !== -1){
                setFocusedOptionIndex(newFocusedIndex);
                checkFocusedOptionPosition(newFocusedIndex);
            }
        }
    }

    const checkFocusedOptionPosition = (newFocusedIndex) => {
        // console.log(menuWrapperRef.current,optionsRefs.current[newFocusedIndex].current)
        const focusedOptionRef = optionsRefs.current[newFocusedIndex].current;
        if (focusedOptionRef !== null){
            const scrollEl = menuWrapperRef.current;
            const focusedStart = focusedOptionRef.getBoundingClientRect().top + scrollEl.scrollTop;
            const focusedEnd = focusedStart + focusedOptionRef.getBoundingClientRect().height;
            const scrollElStart = scrollEl.getBoundingClientRect().top + scrollEl.scrollTop;
            const scrollElEnd = scrollElStart + scrollEl.clientHeight;
            // console.log(focusedStart,focusedEnd,scrollElStart,scrollElEnd)
            if (focusedStart < scrollElStart) {
                scrollEl.scrollTop -= scrollElStart - focusedStart;
            } else if (focusedEnd > scrollElEnd) {
                scrollEl.scrollTop += focusedEnd - scrollElEnd;
            }
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
            // if (menuIsOpen){
                // console.log("Remove click listenr")
                document.removeEventListener('click',handlDocumentClick);
            // }
        };
    }, [menuIsOpen,isSelectFocused])

    useEffect(()=>{
        checkFocusedOptionPosition(focusedOptionIndex);
    },[menuIsOpen])


    return (
        <div tabIndex="0" style={wrapperStyle({isSelectHovered,menuIsOpen,isNativeFocused})} onFocus={handleWrapperFocus} onBlur={handleWrapperFocusOut} >
            <div style={controlStyle({isSelectHovered,isNativeFocused})} onClick={handleControlClick} onMouseEnter={handleWrapperMouseEnter} onMouseLeave={handleWrapperMouseLeave}>
                <div style={valueWrapperStyle}>
                    {selectedOption ? selectedOption.label : 'Select...'}
                </div>
                <div>
                    <span style={indecatorArrowStyle({menuIsOpen})} ></span>
                </div>
            </div>
            { menuIsOpen && 
                <div style={menuWrapperStyle} ref={menuWrapperRef}>
                    {options.map((option,ind)=>{
                        const styleProps = {
                            isFocused:ind===focusedOptionIndex,
                            isSelected:ind===selectedOptionIndex,
                            isFirst:ind===0,
                            isLast:ind===options.length-1
                        }
                        // console.log(itemRender);
                        return(
                            <SelectOption key={ind} 
                                ref={optionsRefs.current[ind]}
                                styleProps={styleProps}
                                option={option}
                                itemRenderFunction={itemRender || false}
                                onMouseEnter={()=>{handleOptionMouseEnter(ind)}} 
                                onClick={()=>{handleOptionClick(option,ind)}}
                            />
                    )})}
                </div>
            }
        </div>
    )
});

const SelectOption = React.memo(React.forwardRef((props, ref) => {
    const {option,styleProps,onMouseEnter,itemRenderFunction,...rest} = props;
    return (
    <div  ref={ref}
          onMouseEnter={onMouseEnter}
          {...rest}>
          {
            typeof option.component === 'function' ? option.component({...styleProps}) : 
            (itemRenderFunction ? itemRenderFunction({...option,...styleProps}):
            <div style={optionWrapperStyle({...styleProps})}>
                {option.component ? ( typeof option.component === 'function' ? option.component({...styleProps}) : option.component ) : option.label}
            </div>)
          }                      
    </div>)
}));

