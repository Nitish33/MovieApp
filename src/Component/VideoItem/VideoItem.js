import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './styles';

export default function VideoItem({item, onClick}) {
  const {poster, title, year, isShortListed} = item;

  const [shortListedMovie, onShortlistStateChange] = React.useState(
    isShortListed,
  );

  const updateShortlistStatus = function () {
    onShortlistStateChange(!shortListedMovie);

    item.isShortListed = !shortListedMovie;

    if (onClick) {
      onClick(item);
    }
  };

  return (
    <View style={Styles.containerStyle}>
      <FastImage
        style={Styles.imageStyle}
        source={{uri: poster}}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={Styles.infoContainerStyle}>
        <View style={Styles.titleContainerStyle}>
          <Text numberOfLines={1}>{title}</Text>
          <Text>{year}</Text>
        </View>

        <TouchableOpacity
          style={Styles.saveButtonStyle}
          onPress={updateShortlistStatus}>
          <Text>{shortListedMovie ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
