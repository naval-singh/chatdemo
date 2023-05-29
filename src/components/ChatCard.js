import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

const defaultUrl = 'https://via.placeholder.com/600/92c952';

const ChatCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.chatCard} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item?.thumbnailUrl ? item.thumbnailUrl : defaultUrl }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.chatContainer}>
        <Text style={styles.title}>{item?.id}</Text>
        <Text style={styles.subTitle} numberOfLines={2}>{item?.title}</Text>
      </View>
      <View style={styles.bedgeContainer}>
        <View style={styles.bedge}>
          <Text style={styles.bedgeText}>{item?.albumId}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  chatCard: {
    height: 90,
    width: '90%',
    borderRadius: 15,
    elevation: 5,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingVertical: 10,
    marginTop: 15,
  },
  imageContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  bedgeContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.black,
    marginTop: 5,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.darkGrey,
  },
  bedge: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bedgeText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.white,
  }
});