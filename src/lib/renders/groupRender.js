import React, { Fragment } from 'react';

import { toLower } from '../tools';
import { RequiredMark } from '../fields';

import FieldRender from './fieldRender.js';


const getChunks = (arr, chunkSize) => {
    var chunks = [];
    for (let i=0; i<arr.length; i+=chunkSize) {
        const chunk = arr.slice(i, i+chunkSize);
        chunks.push(chunk);
    }
    return chunks;
}

const isRowFlex = type => (toLower(type)==="flex") || (!isRowSplit(type) && !isRowFullWidth(type)) ? true : false;
const isRowSplit = type => (toLower(type)==="split") ? true : false;
const isRowFullWidth = type => (toLower(type)==="fullwidth") ? true : false;


const GroupRender = (props) => {
    const { group, isParentGroup, fieldControl, onChange } = props;
    const splitRow = isRowSplit(group.rowType);
    const fieldKeys = Object.keys(group.fields || {});
    const keysChunks = getChunks(fieldKeys, (splitRow ? 2 : 1));
    const groupClassName = group.className ? group.className : null;
    const groupTitle = group.title ? group.title : null;
    const groupDescription = group.description ? group.description : null;
    const requiredMarkTitle = group.requiredMarkTitle ? true : false;
    const requiredMarkDescription = group.requiredMarkDescription ? true : false;

    return(
        <div className={groupClassName}>
            { groupTitle &&
            <div className="_djfb_grid-group-title">{groupTitle}{requiredMarkTitle ? <RequiredMark overrideRenders={fieldControl.overrideRenders} /> : null}</div>
            }
            { groupDescription &&
            <div className="_djfb_grid-group-description">{groupDescription}{requiredMarkDescription ? <RequiredMark overrideRenders={fieldControl.overrideRenders} /> : null}</div>
            }
            <div className="_djfb_grid-group-content">
                { keysChunks.map((chunk, indxChunk) => {
                const rowClass = (!isRowFlex(group.rowType) ? "_djfb_grid-row" : "_djfb_grid-cell") + 
                                 (splitRow ? " splited" : (isRowFullWidth(group.rowType) ? " full-width" : "")) +
                                 (isParentGroup ? " parent" : " children");
                let breakFlex = false;

                return(
                    <Fragment key={`chunk_${indxChunk}`}>
                        <div className={rowClass}>
                        { chunk.map((fieldKey, indxFieldKey) => {
                            const field = group.fields[fieldKey];
                            const fieldClass = field.className ? " " + field.className : "";
                            breakFlex = field.breakFlex ? true : false;

                            return(
                                <Fragment key={`fieldKey_${indxChunk}_${indxFieldKey}`}>
                                    { field.render !== false && 
                                    <div className={(!isRowFlex(group.rowType) ? "_djfb_grid-row" : "_djfb_grid-cell") + " _djfb_grid-field-wrapper" + fieldClass}>
                                        <FieldRender
                                            field={field}
                                            fieldKey={fieldKey}
                                            fieldControl={fieldControl}
                                            renderGroup={GroupRender}
                                            onChange={onChange}
                                        />
                                    </div>
                                    }
                                </Fragment>
                            )
                        })}
                        </div>
                        { breakFlex ? <div className="_djfb_grid-break-flex"></div> : null }
                    </Fragment>
                )
                })}
            </div>
        </div>
    )
}

export default GroupRender;