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
        let newFocusedIndex = options.findIndex((option,index)=>{return option.label.charAt(0).toLowerCase()===key && index > focusedOptionIndex });
        if (newFocusedIndex === -1){
            // checkPrivius 
            newFocusedIndex = options.findIndex((option,index)=>{return option.label.charAt(0).toLowerCase()===key && index !== focusedOptionIndex });
        }
    }
    return newFocusedIndex;
    
}