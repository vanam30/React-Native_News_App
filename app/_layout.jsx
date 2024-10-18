import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    FlatList,
    View,
    Text,
    Switch,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NewsCard from './NewsCard';
import BottomNavigation from './BottomNavigation';
const { height } = Dimensions.get('window');
const API_KEY = '786e9c1383ba4157b5f746da5b9b693b';
const API_URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`;
const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSwipeHint, setShowSwipeHint] = useState({ top: false, bottom: true });
    const flatListRef = useRef(null);
    const [bottomHintText, setBottomHintText] = useState("Swipe down for more stories");
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(API_URL);
                const json = await response.json();
                setNewsData(json.articles);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const isLastItem = (index) => index === newsData.length - 1;
    const renderItem = ({ item, index }) => (
        <View style={{ height }}>
            {index === 0 && (
                <View style={styles.recentNewsContainer}>
                    <Text style={[styles.recentNewsText, isDarkMode && styles.darkRecentNewsText]}>
                        Recent News
                    </Text>
                </View>
            )}
            <NewsCard news={item} isDarkMode={isDarkMode} />
        </View>
    );
    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const atTop = contentOffset.y <= 0;
        const atBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height;
        const isLastItemVisible = contentOffset.y + layoutMeasurement.height >= contentSize.height;
        setShowSwipeHint({
            top: !atTop,
            bottom: !atBottom,
        });
        if (isLastItemVisible) {
            setShowSwipeHint((prev) => ({
                ...prev,
                bottom: true,
            }));
            setBottomHintText("All news shown");
        } else {
            setBottomHintText("Swipe down for more stories");
        }
    };
    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };
    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }
    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={[styles.header, isDarkMode && styles.darkHeader]}>
                <View style={styles.headerTop}>
                    <Text style={[styles.appName, isDarkMode && styles.darkAppName]}>NEWS</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        thumbColor={isDarkMode ? '#3498db' : '#fff'}
                        trackColor={{ false: '#bbb', true: '#444' }}
                    />
                </View>
                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={20}
                        color={isDarkMode ? '#666' : '#666'}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor={isDarkMode ? '#bbb' : '#bbb'}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>
            {showSwipeHint.top && (
                <View style={styles.swipeHintContainer}>
                    <Text style={styles.swipeHintText}>Swipe up for previous stories</Text> 
                </View>
            )}
            <FlatList
                ref={flatListRef}
                data={newsData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                pagingEnabled
                onScroll={handleScroll}
                showsVerticalScrollIndicator={true}
                decelerationRate="fast"
                snapToAlignment="start"
                snapToInterval={height}
                contentContainerStyle={styles.contentContainer}
            />
            {showSwipeHint.bottom && (
                <View style={styles.swipeHintContainer}>
                    <Text style={styles.swipeHintText}>{bottomHintText}</Text>
                </View>
            )}
            <BottomNavigation isDarkMode={isDarkMode} onHomePress={scrollToTop} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    darkHeader: {
        backgroundColor: '#000',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: '#fff',
        elevation: 4,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    appName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    darkAppName: {
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        paddingHorizontal: 10,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    swipeHintContainer: {
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#1e1e1e',
    },
    swipeHintText: {
        fontSize: 14,
        color: '#aaa',
    },
    recentNewsContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    recentNewsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    darkRecentNewsText: {
        color: '#bbb',
    },
});
export default App;
