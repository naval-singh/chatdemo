import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import { colors } from '../constants/colors';
import ChatCard from '../components/ChatCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats } from '../data/reducers/chat/chat.actions';
import { clearState, setPageNumber, setVisibleChats } from '../data/reducers/chat/chat.reducer';

const Chats = () => {
  const dispatch = useDispatch();
  const { pageSize, pageNumber } = useSelector(state => state.chat);
  const { loading, allChats, visibleChats, } = useSelector(state => state.chat);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoader, setFooterLoader] = useState(true);

  // useEffect which is calling the data handler
  useEffect(() => {
    handleFatchData();
    return () => dispatch(clearState());
  }, []);

  // handle to fetch data
  const handleFatchData = () => {
    dispatch(getAllChats())
      .then((res) => {
        if (res?.type === 'chat/getAllChats/rejected') {
          Alert.alert('Unable to fetch data');
        }
        setRefreshing(false);
      })
      .catch(() => setRefreshing(false));
  };

  // handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    handleFatchData();
  };

  // empty list component
  const ListEmptyComponent = () => (
    <View style={styles.centerContainer}>
      <Text>No Chats</Text>
    </View>
  );

  // footer loader
  const ListFooterComponent = () => (
    footerLoader && <View style={{ marginTop: 15 }}>
      <ActivityIndicator size={'small'} color={colors.primary} />
    </View>
  );

  // handle end reached
  const handleEndReached = () => {
    if (allChats?.length === visibleChats?.length) {
      setFooterLoader(false);
    } else {
      setFooterLoader(true);
    }
    let page = pageNumber + 1;
    let numberOfChats = page * pageSize;
    let chats = allChats?.slice(0, numberOfChats);
    dispatch(setPageNumber(page));
    dispatch(setVisibleChats(chats));
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      {/* main header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat Conversation</Text>
      </View>
      {/* all chats */}
      {loading
        ?
        <View style={styles.centerContainer}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
        :
        <FlatList
          data={visibleChats}
          keyExtractor={item => item?.id}
          renderItem={({ item }) => <ChatCard item={item} />}
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={ListFooterComponent}
          onEndReached={handleEndReached}
        />}
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.black,
  },
  content: {
    alignItems: 'center',
    paddingBottom: 15,
    minHeight: '90%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});