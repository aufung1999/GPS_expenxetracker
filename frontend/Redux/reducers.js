import React from 'react'
import {combineReducers} from 'redux'


//######################################################################################################

const isEditLangBtnReducer = (state = true, action) => {
    switch (action.type) {
        case 'EditLangBtnClicked':
            return !state
        default:
            return state
    }
}
//######################################################################################################

const trackingPositionReducer = (state = null, action) => {
    switch (action.type) {
        case 'tracking':
            return action.payload
        default:
            return state
    }
}


//######################################################################################################

const reducers = combineReducers({
    isEditLangBtn: isEditLangBtnReducer,

    trackingPosition: trackingPositionReducer,

})

export default reducers