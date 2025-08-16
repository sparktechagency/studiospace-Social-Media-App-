import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of the context data
interface SidebarContextType {
    isSidebarVisible: boolean;
    toggleSidebar: () => void;
}

// Create the context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Create a provider component that will wrap your app
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
