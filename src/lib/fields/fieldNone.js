import React from 'react';

import { isArray } from '../tools';


const FieldNone = (props) => {
    const { children, renderChild, hideChildren, value } = props;
    return(
        <>
            { (!(hideChildren && !value) && children && isArray(children) && renderChild) && 
                children.map((child, indx) => renderChild(child, indx)) 
            }
        </>
    )
}

export default FieldNone;
