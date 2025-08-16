
// // export default HomeHeader
// import { menuicon, message, notification } from '@/assets/icon/Icon';
// import tw from '@/lib/tailwind';
// import { useState } from 'react';

// import { TextInput, TouchableOpacity, View } from 'react-native';
// import { SvgXml } from 'react-native-svg';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Sidebar from './Sidebar';


// const HomeHeader = () => {
//     const [sidebarVisible, setSidebarVisible] = useState(false);

//     return (
//         <View>
//             <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

//             <View style={tw`bg-[#3A3E41] p-4 pt-12`}>
//                 <View style={tw`flex-row justify-between items-center`}>
//                     {/* Menu Icon */}
//                     <TouchableOpacity onPress={() => setSidebarVisible(true)}>
//                         <SvgXml xml={menuicon} />
//                     </TouchableOpacity>

//                     {/* Search Bar */}
//                     <View style={tw`flex-1 flex-row items-center bg-[#1A1C20] rounded mx-4 px-3`}>
//                         <Icon name="search" size={18} color="#989898" />
//                         <TextInput
//                             placeholder="Search user by name"
//                             placeholderTextColor="#989898"
//                             style={tw`text-white p-2 text-base w-full`}
//                         />
//                     </View>

//                     {/* Action Icons */}
//                     <View style={tw`flex-row items-center gap-4`}>
//                         <TouchableOpacity style={tw`relative`}>
//                             <SvgXml xml={notification} />
//                             <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full`} />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={tw`relative`}>
//                             <SvgXml xml={message} />
//                             <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full`} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default HomeHeader;


import { menuicon, message, notification } from '@/assets/icon/Icon';
import { useSidebar } from '@/lib/hooks/SidebarContext';
import tw from '@/lib/tailwind';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeHeader = () => {
    // Get the toggle function from the global context
    const { toggleSidebar } = useSidebar();

    return (
        <View style={tw`bg-[#3A3E41] p-4 pt-12`}>
            <View style={tw`flex-row justify-between items-center`}>
                {/* Menu Icon now uses the context to open the sidebar */}
                <TouchableOpacity onPress={toggleSidebar}>
                    <SvgXml xml={menuicon} />
                </TouchableOpacity>

                {/* Search Bar */}
                <View style={tw`flex-1 flex-row items-center bg-[#1A1C20] rounded mx-4 px-3`}>
                    <Icon name="search" size={18} color="#989898" />
                    <TextInput
                        placeholder="Search user by name"
                        placeholderTextColor="#989898"
                        style={tw`text-white p-2 text-base w-full`}
                    />
                </View>

                {/* Action Icons */}
                <View style={tw`flex-row items-center gap-4`}>
                    <TouchableOpacity style={tw`relative`}>
                        <SvgXml xml={notification} />
                        <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full`} />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`relative`}>
                        <SvgXml xml={message} />
                        <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full`} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default HomeHeader;
