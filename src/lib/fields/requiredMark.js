import React from "react";

import { SupportFieldType } from '../renders';


const RequiredMark = (props) => {
    const { overrideRenders } = props;
    const Custom = overrideRenders && overrideRenders[SupportFieldType.REQUIRED_MARK];
    return Custom ? <Custom /> : <i className="field-required-mark">*</i>
}

export default RequiredMark;