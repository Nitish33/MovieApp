import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './styles';
import R from '../../Utility/R';

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
      <Image
        style={Styles.imageStyle}
        source={{uri: poster}}
        resizeMode="cover"
      />

      <View style={Styles.infoContainerStyle}>
        <View style={Styles.titleContainerStyle}>
          <Text numberOfLines={1}>{title}</Text>
          <Text>{year}</Text>
        </View>

        <TouchableOpacity
          style={Styles.saveButtonStyle}
          onPress={updateShortlistStatus}>
          <Image
            source={
              shortListedMovie ? R.Images.HeartFilled : R.Images.HeartEmpty
            }
            style={Styles.heartIconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
