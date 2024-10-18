import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Share,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { height, width } = Dimensions.get('window');
const NewsCard = ({ news, isDarkMode }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true);
    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            setDisliked(false);
        } else {
            setLiked(false);
        }
    };
    const handleDislike = () => {
        if (!disliked) {
            setDisliked(true);
            setLiked(false);
        } else {
            setDisliked(false);
        }
    };
    const onShare = async () => {
        try {
            await Share.share({ message: `${news.title} - ${news.url}` });
        } catch (error) {
            alert(error.message);
        }
    };
    const imageUrl = news.urlToImage || 'https://via.placeholder.com/800x600.png?text=News';
    const description = news.content || generateRandomText();
    const generateRandomText = () => {
        const words = Array(50).fill("Lorem ipsum dolor sit amet").join(' ');
        return words;
    };
    return (
        <View style={[styles.card, isDarkMode && styles.darkCard]}>
            <View style={styles.imageContainer}>
                {loadingImage && <ActivityIndicator size="large" color="#3498db" />}
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    onLoadEnd={() => setLoadingImage(false)}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.textContainer}>
                <Text
                    style={[
                        styles.headline,
                        isDarkMode ? styles.darkHeadline : styles.lightHeadline,
                    ]}
                    numberOfLines={2}
                >
                    {news.title}
                </Text>
                <Text style={[styles.content, isDarkMode && styles.darkText]} numberOfLines={3}>
                    {news.description || 'No description available.'}
                </Text>
                <Text style={[styles.source, isDarkMode && styles.darkText]}>
                    Source: {news.source?.name || 'Unknown'} | {new Date(news.publishedAt).toDateString()}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onShare}>
                    <Ionicons name="share-outline" size={28} color={isDarkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLike}>
                    <Ionicons
                        name={liked ? 'thumbs-up' : 'thumbs-up-outline'}
                        size={28}
                        color={liked ? 'green' : isDarkMode ? 'white' : 'black'}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDislike}>
                    <Ionicons
                        name={disliked ? 'thumbs-down' : 'thumbs-down-outline'}
                        size={28}
                        color={disliked ? 'red' : isDarkMode ? 'white' : 'black'}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.readMoreButton}>
                <Text style={[styles.readMoreText, isDarkMode && styles.darkText]}>Read More</Text>
            </TouchableOpacity>
            <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, isDarkMode && styles.darkModal]}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={[styles.modalTitle, isDarkMode && styles.darkText]}>
                                {news.title}
                            </Text>
                            <View style={styles.dividerLine} />
                            <Text style={[styles.modalDescription, isDarkMode && styles.darkText]}>
                                {description}
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 4,
        elevation: 2,
        width: width * 0.9,
    },
    darkCard: {
        backgroundColor: '#333',
    },
    imageContainer: {
        width: '100%',
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        padding: 16,
    },
    headline: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    lightHeadline: {
        color: '#000',
    },
    darkHeadline: {
        color: '#fff',
    },
    content: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    source: {
        fontSize: 12,
        color: '#999',
        marginBottom: 16,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    readMoreButton: {
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 14,
        paddingVertical: 8,
    },
    readMoreText: {
        textAlign: 'center',
        color: '#3498db',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width * 0.85,
        height: height * 0.4,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    darkModal: {
        backgroundColor: '#333',
    },
    closeButton: {
        position: 'absolute',
        top: -15,
        right: -15,
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    dividerLine: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'justify',
    },
    darkText: {
        color: '#fff',
    },
});
export default NewsCard;
