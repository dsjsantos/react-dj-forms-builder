import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import DatePicker, { registerLocale } from "react-datepicker";

import { FormBuilderSupportFields, getFieldContentClasses } from 'react-dj-forms-builder';

import iconCalendar from './icon_calendar.png';


// Datepicker and component styles
import "react-datepicker/dist/react-datepicker.css";
import './customDateWithDatePicker.scss';


let eventOnPageResizeScroll = null;

const DATE_PICKER_WRAPPER_ID = "datePickerWrapperId";
const DATE_PICKER_BUTTON_ID = "datePickerButtonId";

const _dateMaskAdd = (unmaskedValue, isErasing) => {
    if(unmaskedValue) {
        if(isErasing) { // add first '/' with 3 digits and '/' 5 dígitos
            return unmaskedValue
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/, "$1/$2")
                .replace(/(\d{2})(\d)/, "$1/$2")
                .replace(/(\d{4})\d+?$/, "$1");
        } else { // add first '/' with 2 digits and '/' 4 dígitos
            return unmaskedValue
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d*)/, "$1/$2")
                .replace(/(\/\d{2})(\d*)/, "$1/$2")
                .replace(/(\/\d{4})\d+?$/, "$1");
        }
    }
    return "";
}

const _dateMaskRemove = (maskedValue) => {
    if(maskedValue) {
        return maskedValue.replace(/\//g, "");
    }
    return "";
}

const _formatDate = (date, swapMonthAndDay) => {
    if(date instanceof Date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth()+1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        return swapMonthAndDay ? `${dd}/${mm}/${yyyy}` : `${mm}/${dd}/${yyyy}`;
    }
    return "";
}

const _stringToDate = (strDate, swapMonthAndDay) => {
    if(/^\d{2}\/\d{2}\/\d{4}$/.test(strDate)) {
        const dateParts = strDate.split("/");
        const year = dateParts[2];
        const month = (swapMonthAndDay ? dateParts[1] : dateParts[0]) - 1;
        const day = swapMonthAndDay ? dateParts[0] : dateParts[1];
        return new Date(year, month, day);
    }
    return null;
}

const CustomDatePicker = (props) => {
    const { id, value, locale, swapMonthAndDay, minDate, maxDate, onChange, onClickOutside } = props;
    return(
        <div id={DATE_PICKER_WRAPPER_ID} className="date-picker-wrapper">
            <div className="triangle-up"></div>
            <DatePicker
                id={id}
                selected={_stringToDate(value, swapMonthAndDay)}
                locale={locale}
                dateFormat={swapMonthAndDay ? "dd/MM/yyyy" : "MM/dd/yyyy"}
                onChange={date => { onChange(date); }}
                onClickOutside={e => onClickOutside(e)}
                fixedHeight={false}
                minDate={_stringToDate(minDate, swapMonthAndDay)}
                maxDate={_stringToDate(maxDate, swapMonthAndDay)}
                inline />
            <div className="triangle-down not-visible"></div>
        </div>
    )
}

const CustomDateWithDatePicker = (props) => {
    const [ visibleDatePicker, setVisibleDatePicker ] = useState(null);
    const { id, name, label, placeHolder, disabled, requiredMark, value, errorMessage,
            onChange, datePicker, fieldCurrentState } = props;
    const { locale, swapMonthAndDay, minDateField, maxDateField, topWhileAboveInput, topWhileUnderInput } = datePicker || {};
    let { minDate, maxDate } = datePicker || {};
    minDate = minDate ? minDate : (minDateField && fieldCurrentState[minDateField] ? fieldCurrentState[minDateField].value : null);
    maxDate = maxDate ? maxDate : (maxDateField && fieldCurrentState[maxDateField] ? fieldCurrentState[maxDateField].value : null);
    const inputClassName = errorMessage ? "error" : "";
    const isDatePickerVisible = name===visibleDatePicker;
    const enableDatePicker = datePicker && datePicker.enabled;

    const _handleBlur = (e, { name, value }) => {
        if(!_stringToDate(value, swapMonthAndDay)) {
            onChange(e, {name, value: ""});
        }
    }

    const _handleChange = (e, { name, value }) => {
        onChange(e, { 
            name, 
            value,
            inputRegEx: /^[0-9]{0,8}$/,
            removeMask: _dateMaskRemove,
            addMask: _dateMaskAdd
        });
    }

    const _handleDatePickTrigger = (field, forceHide) => {
        const newVisibleDatePicker = (forceHide || field===visibleDatePicker) ? null : field;
        eventOnPageResizeScroll = !newVisibleDatePicker ? null : () => {
            const dpWrapper = $(`#${DATE_PICKER_WRAPPER_ID}`);
            if(dpWrapper.length===1) {
                const { height } = dpWrapper[0].getBoundingClientRect();
                const ptop = dpWrapper.parent()[0].getBoundingClientRect().top;
                const vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                const upTriagle = dpWrapper.find('.triangle-up');
                const downTriagle = dpWrapper.find('.triangle-down');
                if((ptop + topWhileUnderInput + height) > vh && (ptop-height)>0) { // place above input
                    if((ptop + topWhileUnderInput)<vh) {
                        upTriagle.addClass('not-visible');
                        downTriagle.removeClass('not-visible');
                        dpWrapper.css('top', '-' + (height-topWhileAboveInput) + 'px');
                    } else { // hide date picker
                        _hideDatePicker(null);
                    }
                } else {
                    upTriagle.removeClass('not-visible');
                    downTriagle.addClass('not-visible');
                    dpWrapper.css('top', `${topWhileUnderInput}px`);
                }
            }
        };
        setVisibleDatePicker(newVisibleDatePicker);
    }

    const _handlePageResizeScroll = () => {
        if(eventOnPageResizeScroll) {
            eventOnPageResizeScroll();
        }
    };

    const _hideDatePicker = (obj) => {
        const { outside, nativeEvent }  = obj || {};
        const triggerId = `${visibleDatePicker}_${DATE_PICKER_BUTTON_ID}`;
        const srcElement = nativeEvent && nativeEvent.srcElement;
        const triggerClick = outside && srcElement && (srcElement.id===triggerId 
            || (srcElement.offsetParent && srcElement.offsetParent.id===triggerId));
        if(triggerClick) { // a datepicker click will be triggered and will close the date picker
            return;
        }
        _handleDatePickTrigger(null, true);
    }

    useEffect(() => {
        if(visibleDatePicker) {
            _handlePageResizeScroll();
        }
    }, [visibleDatePicker]);

    useEffect(() => {
        if(locale && locale.code) {
            registerLocale(locale.code, locale);
        }
    }, [locale]);

    useEffect(() => {
        window.addEventListener("resize", _handlePageResizeScroll, true);
        document.addEventListener("scroll", _handlePageResizeScroll, true);
        return(() => {
            window.removeEventListener("resize", _handlePageResizeScroll, true);
            document.removeEventListener("scroll", _handlePageResizeScroll, true);
        });
    }, []);

    return(
        <>
            { label &&
            <div className="field-label">{label}{requiredMark ? <FormBuilderSupportFields.RequiredMark /> : null}</div>
            }
            <div className={`input-wrapper ${getFieldContentClasses(value, errorMessage, disabled)}`}>
                <input 
                    id={id}
                    name={name}
                    disabled={disabled}
                    className={inputClassName}
                    placeholder={placeHolder}
                    onChange={(e) => _handleChange(e, {name: name, value: e.target.value})}
                    onBlur={(e) => _handleBlur(e, {name: name, value: e.target.value})}
                    autoComplete={name}
                    value={value ? value : ""}
                />
                { enableDatePicker &&
                <>
                    <div className="date-picker-trigger">
                        <div className="button-wrapper">
                            <button id={`${name}_${DATE_PICKER_BUTTON_ID}`} type="button" disabled={disabled} onClick={() => _handleDatePickTrigger(isDatePickerVisible ? null : name)}>
                                <img src={iconCalendar} alt="" className="trigger-icon" />
                            </button>
                        </div>
                    </div>
                    { isDatePickerVisible &&
                        <CustomDatePicker 
                            id={`_datepicker_${id}`}
                            value={value}
                            locale={locale}
                            swapMonthAndDay={swapMonthAndDay}
                            minDate={minDate}
                            maxDate={maxDate}
                            onChange={date => { _handleChange(null, {name: name, value: _formatDate(date, swapMonthAndDay)}); _hideDatePicker(null); } }
                            onClickOutside={e => _hideDatePicker({ outside: true, nativeEvent: e})}
                        />
                    }
                </>
                }
            </div>
            { errorMessage &&
            <div className="field-error">{errorMessage}</div>
            }
        </>
    );
}

export default CustomDateWithDatePicker;
export  {
    DATE_PICKER_WRAPPER_ID
}