import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const BottomNavigation = ({ isDarkMode, onHomePress }) => {
    const [activeTab, setActiveTab] = useState('Home');
    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            { }
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setActiveTab('Home');
                    onHomePress();
                }}
            >
                <Ionicons
                    name="home-outline"
                    size={24}
                    color={activeTab === 'Home' ? '#3498db' : isDarkMode ? 'white' : 'gray'}
                />
                <Text
                    style={[
                        styles.text,
                        activeTab === 'Home' ? styles.activeText : null,
                        isDarkMode && styles.darkText,
                    ]}
                >
                    Home
                </Text>
            </TouchableOpacity>
            { }
            <TouchableOpacity
                style={styles.button}
                onPress={() => setActiveTab('Categories')}
            >
                <Ionicons
                    name="filter-outline"
                    size={24}
                    color={activeTab === 'Categories' ? '#3498db' : isDarkMode ? 'white' : 'gray'}
                />
                <Text
                    style={[
                        styles.text,
                        activeTab === 'Categories' ? styles.activeText : null,
                        isDarkMode && styles.darkText,
                    ]}
                >
                    Categories
                </Text>
            </TouchableOpacity>
            { }
            <TouchableOpacity
                style={styles.button}
                onPress={() => setActiveTab('Profile')}
            >
                <Ionicons
                    name="person-outline"
                    size={24}
                    color={activeTab === 'Profile' ? '#3498db' : isDarkMode ? 'white' : 'gray'}
                />
                <Text
                    style={[
                        styles.text,
                        activeTab === 'Profile' ? styles.activeText : null,
                        isDarkMode && styles.darkText,
                    ]}
                >
                    Profile
                </Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        elevation: 4,
    },
    darkContainer: {
        backgroundColor: '#000',
    },
    button: {
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        color: 'gray',
        marginTop: 4,
    },
    darkText: {
        color: 'white',
    },
    activeText: {
        color: '#3498db',
        fontWeight: 'bold',
    },
});
export default BottomNavigation;
