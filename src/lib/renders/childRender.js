import React from 'react';

import { isObject } from '../tools';


const ChildRender = (props) => {
    const { child, fieldControl, onChange, renderGroup } = props;
    const RenderGroup = renderGroup;
    if(!isObject(child) || Object.keys(child).length < 1 || child.render===false) {
        return null;
    }
    return(
        <div className="group-children">
            <RenderGroup
                group={child}
                isParentGroup={false}
                fieldControl={fieldControl}
                onChange={onChange}
            />
        </div>
    )
}

export default ChildRender;