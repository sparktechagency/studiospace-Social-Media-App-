import { BackIcon } from '@/assets/icon/Icon'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const BackButton = () => {
    return (
        <View>
            <TouchableOpacity onPress={() => router.back()} style={tw`bg-[#4B4B4B] w-12 h-12 rounded-full items-center justify-center absolute top-10 left-5 z-10`}>
                <SvgXml xml={BackIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton
