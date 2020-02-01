export const wrapperStyle =  (props) => ({
    // border:5px solid ${props.borderColor};
    width:'100%',
    boxSizing: 'border-box',
    position:'relative',
    zIndex: `${props.isSelectHovered || props.menuIsOpen ? 2 : 1}`,
    outline:'none'
});

export const controlStyle = (props) => ({
    width:'100%',
    height: '36px',
    border:`${props.isSelectHovered || props.isNativeFocused ? '2' : '1'}px solid #3e3e3e`,
    borderRadius:'3px',
    padding:`${props.isSelectHovered || props.isNativeFocused ? '7' : '8'}px`,
    boxSizing:'border-box',
    display:'flex',
    justifyContent: 'space-between',
});

export const valueWrapperStyle = {
    fontSize:'16px'
};

export const indecatorArrowStyle = (props) => ({
    width:'12px',
    height: '12px',
    boxSizing: 'border-box',
    border: 'solid black',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '3px',
    position: 'absolute',
    right: '16px',
    top: `${props.menuIsOpen ? '14' : '8'}px`,
    transform: `rotate(${props.menuIsOpen ? '-135' : '45'}deg)`,
    // transition: 'all 0.2s';
});

export const menuWrapperStyle = {
    position: 'absolute',
    top:'100%',
    width:'100%',
    boxSizing: 'border-box',
    border: '1px solid #3e3e3e',
    borderRadius:'3px',
    maxHeight:'250px',
    overflowY: 'auto',
};

export const optionWrapperStyle = (props) => ({
    padding:'8px',
    fontSize:'14px',
    borderBottom:`${props.isLast ? 'none' : '1px solid gray'}`,
    color: `${props.isSelected ? '#fff' : '#000'}`,
    backgroundColor:`${props.isSelected ? (props.isFocused ? '#0770ff' : '#3389ff' ) : ( props.isFocused ? '#efefef' : '#fff' )}`,
});

