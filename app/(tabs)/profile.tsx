import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

// --- Type Definitions ---
interface ProfileProps {
    isCurrentUser?: boolean; // This prop determines which profile view to show
}

// --- Reusable Components ---

const InfoCard: React.FC<{ title: string; children: React.ReactNode; isPrivate?: boolean }> = ({ title, children, isPrivate }) => (
    <View style={tw`bg-[#3A3E41] p-4 rounded-lg mb-4`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-white text-xl font-bold`}>{title}</Text>
            {isPrivate && (
                <View style={tw`bg-[#4593F5] py-1 px-2 rounded-md flex-row items-center gap-1`}>
                    <Icon name="lock" size={12} color="white" />
                    <Text style={tw`text-white text-xs font-semibold`}>Private</Text>
                </View>
            )}
        </View>
        {children}
    </View>
);

const StatItem: React.FC<{ icon: string; value: string; label: string }> = ({ icon, value, label }) => (
    <View style={tw`items-center`}>
        <View style={tw`flex-row items-center gap-2`}>
            <Icon name={icon} size={20} color="#1778F2" />
            <Text style={tw`text-white text-lg font-semibold`}>{value}</Text>
        </View>
        <Text style={tw`text-white text-sm font-bold`}>{label}</Text>
    </View>
);

const ExperienceItem: React.FC<{ title: string; company: string; duration: string; location: string; description: string; logo: string }> = ({ title, company, duration, location, description, logo }) => (
    <View style={tw`flex-row gap-4 mb-4`}>
        <Image source={{ uri: logo }} style={tw`w-10 h-10 rounded-lg mt-1`} />
        <View style={tw`flex-1`}>
            <Text style={tw`text-white font-bold text-base`}>{title}</Text>
            <Text style={tw`text-gray-400 text-sm`}>{company}</Text>
            <Text style={tw`text-gray-400 text-xs`}>{duration} · {location}</Text>
            <Text style={tw`text-gray-300 text-sm mt-2`}>{description}</Text>
        </View>
    </View>
);

const SkillPill: React.FC<{ text: string }> = ({ text }) => (
    <View style={tw`bg-[#84B2EA] py-1 px-3 rounded-full`}>
        <Text style={tw`text-[#1A4B87] text-xs font-bold`}>{text}</Text>
    </View>
);

const Gallery: React.FC = () => {
    const images = [
        'https://placehold.co/127x178/EFEFEF/3A3E41?text=1',
        'https://placehold.co/127x178/EFEFEF/3A3E41?text=2',
        'https://placehold.co/127x178/EFEFEF/3A3E41?text=3',
        'https://placehold.co/127x178/EFEFEF/3A3E41?text=4',
        'https://placehold.co/127x178/EFEFEF/3A3E41?text=5',
    ];

    return (
        <View style={tw`bg-[#3A3E41] p-4 rounded-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-white text-xl font-bold`}>Gallery</Text>
                <TouchableOpacity>
                    <Text style={tw`text-[#1778F2] font-semibold`}>See All</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`flex-row flex-wrap justify-between`}>
                {images.map((uri, index) => (
                    <Image
                        key={index}
                        source={require('../../assets/images/postimg1.png')}
                        style={tw`w-[32%] h-44 rounded mb-2`}
                    />
                ))}
                <TouchableOpacity style={tw`w-[32%] h-44 rounded mb-2 bg-gray-700 items-center justify-center`}>
                    <Icon name="plus" size={24} color="white" />
                    <Text style={tw`text-white mt-2`}>Add New</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- Main Profile Screen ---
const ProfileScreen: React.FC<ProfileProps> = ({ isCurrentUser = true }) => {
    const [isConnected, setIsConnected] = useState(false);

    const userData = {
        name: 'Harry',
        title: 'UI/UX Designer',
        company: 'Zetanest',
        location: 'Dhaka, Bangladesh',
        avatar: 'https://placehold.co/93x93/EFEFEF/3A3E41?text=H',
        cover: 'https://placehold.co/440x188/cccccc/3A3E41?text=Cover',
        stats: {
            connections: '1245',
            views: '250',
            endorsements: '12',
        },
        about: 'Passionate software engineer with 5+ years of experience building scalable web applications and leading development teams. I specialize in modern JavaScript frameworks and cloud technologies.',
        experience: [
            { title: 'Senior Software Engineer', company: 'Zetanest', duration: '2022 - Present', location: 'Dhaka, Bangladesh', description: 'Leading frontend development for enterprise SaaS applications using React, TypeScript, and modern web technologies.', logo: 'https://placehold.co/37x37/EFEFEF/3A3E41?text=Z' },
            { title: 'Software Engineer', company: 'InnovateLab', duration: '2021 - 2022', location: 'Dhaka, Bangladesh', description: 'Developed and maintained web applications.', logo: 'https://placehold.co/37x37/EFEFEF/3A3E41?text=I' },
        ],
        education: {
            degree: 'B.Sc. in Computer Science',
            university: 'University of Dhaka',
            duration: '2016-2020',
            logo: 'https://placehold.co/50x52/EFEFEF/3A3E41?text=UD'
        },
        skills: ['Javascript', 'Typescript', 'React', 'Node.js', 'Python'],
    };

    return (
        <ScrollView style={tw`flex-1 bg-[#0F0E13]`}>
            {/* --- Profile Header --- */}
            <View>
                <Image source={require('../../assets/images/postimg1.png')} style={tw`w-full h-48`} />
                <View style={tw`bg-[#3A3E41] p-4 pt-16`}>
                    <Text style={tw`text-white text-2xl font-bold text-center`}>{userData.name}</Text>
                    <Text style={tw`text-gray-400 text-sm text-center`}>{userData.title}</Text>
                    <View style={tw`flex-row items-center justify-center gap-1`}>
                        <Icon name="briefcase" size={14} color="#989898" />
                        <Text style={tw`text-gray-400 text-sm`}>{userData.company}</Text>
                    </View>
                    <View style={tw`flex-row items-center justify-center gap-1`}>
                        <Icon name="map-marker" size={14} color="#989898" />
                        <Text style={tw`text-gray-400 text-sm`}>{userData.location}</Text>
                    </View>
                </View>

                {/* Overlapping Avatar and Action Buttons */}
                <View style={tw`absolute top-0 w-full mt-32`}>
                    <View style={tw`items-center`}>
                        <Image source={require('../../assets/images/avater/avater3.png')} style={tw`w-24 h-24 rounded-full border-4 border-[#3A3E41]`} />
                    </View>
                    {isCurrentUser ? (
                        <>
                            <TouchableOpacity style={tw`absolute top-0 right-4 bg-[#4593F5] py-1 px-3 rounded-md flex-row items-center gap-2`}>
                                <MaterialIcon name="edit" size={16} color="white" />
                                <Text style={tw`text-white font-semibold text-xs`}>Edit profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`absolute top-20 right-32 bg-[#3A3E41] p-2 rounded-full`}>
                                <Icon name="camera" size={14} color="white" />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={tw`flex-row items-center justify-center gap-4 mt-20`}>
                            <TouchableOpacity
                                style={tw`bg-[#1778F2] py-2 px-6 rounded-full border border-white flex-row items-center gap-2`}
                                onPress={() => setIsConnected(!isConnected)}
                            >
                                <Icon name="user-plus" size={16} color="white" />
                                <Text style={tw`text-white font-bold`}>{isConnected ? 'Connected' : 'Connect'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`py-2 px-6 rounded-full border border-white flex-row items-center gap-2`}>
                                <Icon name="envelope" size={16} color="white" />
                                <Text style={tw`text-white font-semibold`}>Message</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            {/* --- Stats Bar --- */}
            <View style={tw`bg-[#3A3E41] py-4 flex-row justify-around items-center border-t border-gray-6 00`}>
                <StatItem icon="users" value={userData.stats.connections} label="Connections" />
                <StatItem icon="eye" value={userData.stats.views} label="Profile views" />
                <StatItem icon="star" value={userData.stats.endorsements} label="Endorsements" />
            </View>

            {/* --- Profile Body --- */}
            <View style={tw`p-4`}>
                <InfoCard title="About">
                    <Text style={tw`text-gray-300`}>{userData.about}</Text>
                </InfoCard>

                <InfoCard title="Experience" isPrivate>
                    {userData.experience.map((exp, index) => <ExperienceItem key={index} {...exp} />)}
                </InfoCard>

                <InfoCard title="Education" isPrivate>
                    <View style={tw`flex-row gap-4`}>
                        <Image source={{ uri: userData.education.logo }} style={tw`w-12 h-12 rounded-lg`} />
                        <View>
                            <Text style={tw`text-white font-bold text-base`}>{userData.education.degree}</Text>
                            <Text style={tw`text-gray-400 text-sm`}>{userData.education.university}</Text>
                            <Text style={tw`text-gray-400 text-xs`}>{userData.education.duration}</Text>
                        </View>
                    </View>
                </InfoCard>

                <InfoCard title="Skills">
                    <View style={tw`flex-row flex-wrap gap-2`}>
                        {userData.skills.map(skill => <SkillPill key={skill} text={skill} />)}
                    </View>
                </InfoCard>

                <Gallery />
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;
