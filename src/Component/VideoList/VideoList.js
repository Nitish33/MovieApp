import React from 'react';
import {FlatList, View, Text, Image} from 'react-native';
import VideoItem from '../VideoItem/VideoItem';
import R from '../../Utility/R';
import Styles from './styles';

export default function VideoList({
  movies,
  onVideoStatusChange,
  onLoadMore,
  emptyStateMessage,
  extraData,
}) {
  const renderItem = function ({item}) {
    return <VideoItem item={item} onClick={onVideoStatusChange} />;
  };

  return (
    <FlatList
      style={Styles.containerStyle}
      numColumns={2}
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item, index) => {
        return `${item.imdbId} + ${item.isShortListed}`;
      }}
      ListEmptyComponent={
        <View
          style={[
            Styles.emptyStateContainerStyle,
            R.CommonStyle.centerContent,
          ]}>
          <Image
            style={Styles.emptyStateImageStyle}
            source={R.Images.EmptyState}
          />
          <Text>{emptyStateMessage}</Text>
        </View>
      }
      onEndReached={onLoadMore}
      extraData={extraData}
    />
  );
}
