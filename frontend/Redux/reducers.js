import React from 'react'
import {combineReducers} from 'redux'


//######################################################################################################

const isEditLangBtnReducer = (state = false, action) => {
    switch (action.type) {
        case 'EditLangBtnClicked':
            return !state
        default:
            return state
    }
}


//######################################################################################################

const reducers = combineReducers({
    isEditLangBtn: isEditLangBtnReducer,

})

export default reducers