import tw from '@/lib/tailwind'
import React from 'react'
import { ScrollView, View } from 'react-native'
import StoryCircle from './StoryCircle'

const Stories = () => {
    return (
        <View>
            <View style={tw`bg-[#3A3E41] py-4`}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-2`}>
                    <StoryCircle imageUrl={require('../../../assets/images/avater/avater4.png')} hasStory />
                    <StoryCircle imageUrl={require('../../../assets/images/avater/avater2.png')} hasStory isLive />
                    <StoryCircle imageUrl={require('../../../assets/images/avater/avater2.png')} />
                    <StoryCircle imageUrl={require('../../../assets/images/avater/avater3.png')} hasStory />
                    <StoryCircle imageUrl={require('../../../assets/images/avater/avater4.png')} isLive />
                    <StoryCircle imageUrl={require('../../../assets/images/avater/avater2.png')} />
                </ScrollView>
            </View>
        </View>
    )
}

export default Stories