import React , {useState, useEffect, useRef, useImperativeHandle } from 'react';
import { getNewFocusedOptionIndex } from './functions';
import {wrapperStyle, controlStyle, menuWrapperStyle, optionWrapperStyle, valueWrapperStyle, indecatorArrowStyle} from './styles/components.styles';



export const Select = React.forwardRef((props, ref) => { 

    const {options,onSelect,afterMenuIsOpen,isOpen,itemRender,customStyle,closeOnOutClick,closeOnSelectOption} = props;

    const [menuIsOpen, setMenuIsOpen] = useState(isOpen); // we use menuIsOpen instead of isOpen, because isOpen is prop that make the select controled
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    // const [focusedOption, setFocusedOption] = useState(options[0]);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
    const [isSelectFocused, setIsSelectFocused] = useState(false);
    const [isNativeFocused, setIsNativeFocused] = useState(false);
    const [isSelectHovered, setIsSelectHovered] = useState(false);
    const [isControlHovered, setIsControlHovered] = useState(false);
    //const [optionsRefs, setOptionRefs] = useState([]);
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
        setSelectedOption(option);
        setSelectedOptionIndex(index);
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
        } else if (menuIsOpen && e.keyCode !== 9 && e.code !== 'Tab') {
            const newFocusedIndex = getNewFocusedOptionIndex(e.keyCode,e.key,options,focusedOptionIndex);
            if (newFocusedIndex !== -1){
                setFocusedOptionIndex(newFocusedIndex);
                checkFocusedOptionPosition(newFocusedIndex);
            }
            e.preventDefault();  
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
            // console.log("Remove click listenr")
            document.removeEventListener('click',handlDocumentClick);
        };
    }, [menuIsOpen,isSelectFocused])

    useEffect(()=>{
        if (menuIsOpen){
            if (afterMenuIsOpen){
                afterMenuIsOpen({controlRef,menuRef:menuWrapperRef});
            }
            checkFocusedOptionPosition(focusedOptionIndex);
        }
    },[menuIsOpen])


    return (
        <div tabIndex="0" style={wrapperStyle({isSelectHovered,isControlHovered,menuIsOpen,isNativeFocused})} onFocus={handleWrapperFocus} onBlur={handleWrapperFocusOut} onMouseEnter={handleWrapperMouseEnter} onMouseLeave={handleWrapperMouseLeave} >
            <div ref={controlRef} style={controlStyle({isSelectHovered,isControlHovered,isNativeFocused})} onClick={handleControlClick} onMouseEnter={handleControlMouseEnter} onMouseLeave={handleControlMouseLeave}>
                <div style={valueWrapperStyle}>
                    {selectedOption ? selectedOption.label : 'Select...'}
                </div>
                <div>
                    <span style={indecatorArrowStyle({menuIsOpen})} ></span>
                </div>
            </div>
            { menuIsOpen && 
                <div style={menuWrapperStyle({customStyle: customStyle && customStyle.menu ? customStyle.menu : {} })} ref={menuWrapperRef}>
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
                                
                                styleProps={styleProps}
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
    const {option,styleProps,onMouseEnter,itemRenderFunction,...rest} = props;
    return (
    <div  {...rest}>
          {
            typeof option.component === 'function' ? option.component({...styleProps}) : 
            (itemRenderFunction ? itemRenderFunction({...option,...styleProps}):
            <div style={optionWrapperStyle({...styleProps})}>
                {option.component ? ( typeof option.component === 'function' ? option.component({...styleProps}) : option.component ) : option.label}
            </div>)
          }                      
    </div>)
});

