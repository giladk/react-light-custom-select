export const getWrapperStyle =  (props) => ({
    // border:5px solid ${props.borderColor};
    width:'100%',
    boxSizing: 'border-box',
    position:'relative',
    zIndex: `${ props.isSelectHovered ? 3  : props.menuIsOpen ? 2 : 1}`,
    outline:'none'
});

export const getControlStyle = (props,customStyle) => {
    const borderProps = customStyle && customStyle.border ? {
        padding:'8px'
    } : {
        borderStyle:'solid',
        borderWidth:`${props.isControlHovered || props.isFocused ? '2' : '1'}px`, // solid #3e3e3e`,
        borderColor: '#3e3e3e',
        padding:`${props.isControlHovered || props.isFocused ? '7' : '8'}px`,
    }
    return {
        width:'100%',
        //height: '36px',
        borderRadius:'3px',
        boxSizing:'border-box',
        display:'flex',
        fontSize:'16px',
        justifyContent: 'space-between',
        backgroundColor:'#fff',
        ...borderProps
    }
};

export const getValueWrapperStyle = (props,customStyle) => ({
    flex:1,
    paddingRight:'28px',
})

export const getValueStyle = (props,customStyle) => ({
    
})


export const getIndecatorWrapperStyle = (props,customStyle) => ({
    display:'flex',
    flexDirection:'column',
    justifyContent : 'center',
    alignItems : 'center',
    paddingRight: '8px'
})

export const getIndecatorStyle = (props,customStyle) => ({
    width:'12px',
    height: '12px',
    boxSizing: 'border-box',
    border: 'solid black',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '3px',
    // position: 'absolute',
    // right: '16px',
    // top: `${props.menuIsOpen ? '14' : '8'}px`,
    // marginTop: `${props.menuIsOpen ? '14' : '8'}px`,
    transform: `rotate(${props.menuIsOpen ? '-135' : '45'}deg) translate${props.menuIsOpen? 'X' : 'Y'}(-3px)`,
    // transition: 'all 0.2s'
});

export const getMenuWrapperStyle = (props,customStyle) => ({
    position: 'absolute',
    top:'100%',
    width:'100%',
    boxSizing: 'border-box',
    border: '1px solid #3e3e3e',
    borderRadius:'3px',
    maxHeight:'250px',
    overflowY: 'auto',
    backgroundColor:'#fff'
});

export const getOptionWrapperStyle = (props,customStyle) => {
    const {isSelected , isFocused } = props;
    const optionProps = {
        ...(customStyle && customStyle.default ? customStyle.default : {}),
        ...(isFocused && customStyle && customStyle.focused ? customStyle.focused : {}),
        ...(isSelected ? {
            ...(isSelected && customStyle && customStyle.selected ? customStyle.selected : {}),
            ...(isFocused && customStyle && customStyle.focusedSelected ? customStyle.focusedSelected : {})
        } : {})        
    } 
    return {
        padding:'8px',
        fontSize:'14px',
        borderBottom:`${props.isLast ? 'none' : '1px solid gray'}`,
        color: `${props.isSelected ? '#fff' : '#000'}`,
        backgroundColor:`${props.isSelected ? (props.isFocused ? '#0770ff' : '#3389ff' ) : ( props.isFocused ? '#efefef' : '#fff' )}`,
        ...optionProps
    }
}

