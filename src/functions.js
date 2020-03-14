export const getComponentStyle = (styleProps,styleFuncion,customStyle,spreadCustomStyle) => {

    const componentStyleProps = {
        ...styleProps
    }
    const componentDefaultStyle = styleFuncion(componentStyleProps, customStyle ? customStyle : {});
    const componentStyle = customStyle ? ( typeof customStyle === 'function' ? customStyle(componentDefaultStyle,componentStyleProps) : {...componentDefaultStyle, ...(spreadCustomStyle ? customStyle : {})} ) : componentDefaultStyle;
    return componentStyle;
}

export const getNewFocusedOptionIndex = (keyCode,key,options, focusedOptionIndex) => {
    // console.log("getFocusedOptionIndex", keyCode,options, focusedOptionIndex);
    let newFocusedIndex = 0;
    if (keyCode === 38) {
        // move up
        newFocusedIndex = focusedOptionIndex === 0 ? options.length-1 : focusedOptionIndex-1 ;
    }
    else if (keyCode === 40) {
        // move down
        newFocusedIndex = focusedOptionIndex === options.length-1 ? 0 : focusedOptionIndex+1;
    }
    else {
        // search by key
        newFocusedIndex = options.findIndex((option,index)=>{return option.label.charAt(0).toLowerCase()===key && index > focusedOptionIndex });
        if (newFocusedIndex === -1){
            // checkPrivius 
            newFocusedIndex = options.findIndex((option,index)=>{return option.label.charAt(0).toLowerCase()===key && index !== focusedOptionIndex });
        }
    }
    return newFocusedIndex;   
}

export const getScrollPositionForOption = (menuEl,optionEl) => {
    let scrollTop = menuEl.scrollTop;
    const optionStart = optionEl.getBoundingClientRect().top + menuEl.scrollTop;
    const optionEnd = optionStart + optionEl.getBoundingClientRect().height;
    const scrollElStart = menuEl.getBoundingClientRect().top + menuEl.scrollTop;
    const scrollElEnd = scrollElStart + menuEl.clientHeight;
    // console.log(optionStart,optionEnd,scrollElStart,scrollElEnd)
    if (optionStart < scrollElStart) {
        scrollTop -= scrollElStart - optionStart;
    } else if (optionEnd > scrollElEnd) {
        scrollTop += optionEnd - scrollElEnd;
    }
    return scrollTop;
}
