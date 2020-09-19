import React from 'react';
import {FlatList} from 'react-native';
import VideoItem from '../VideoItem/VideoItem';

export default function VideoList({movies, onVideoStatusChange, onLoadMore}) {
  const renderItem = function ({item, index}) {
    return <VideoItem item={item} onClick={onVideoStatusChange} />;
  };

  return (
    <FlatList
      style={{width: '100%'}}
      numColumns={2}
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item, index) => {
        return item.imdbId;
      }}
      onEndReached={onLoadMore}
    />
  );
}
