import { View, Text } from 'react-native'
import React from 'react'
import client from '../../api/client'

const uploadServer = async( location, email ) => {

    console.log(email)
    const res = await client.post('/store-location', {"email":email, "location":location })
    console.log(res.data);
}

export default uploadServer