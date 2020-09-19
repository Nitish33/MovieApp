import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Styles from './styles';
import R from '../../Utility/R';

const {width: ScreenWidth} = Dimensions.get('screen');

export default class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animated: new Animated.Value(0),
      searchText: '',
    };
  }

  onSearchTextChange = (text) => {
    this.setState({searchText: text});
  };

  getTitleStyle = () => {
    const {animated} = this.state;

    const interpolatedWidth = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [ScreenWidth - 40, 0],
    });

    const opacityInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const paddingInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 10],
    });

    return {
      width: interpolatedWidth,
      height: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      paddingLeft: paddingInterpolation,
      overflow: 'hidden',
      opacity: opacityInterpolation,
    };
  };

  expandAnimation = () => {
    const {searchEnabled = true} = this.props;

    if (!searchEnabled) {
      return;
    }

    this.runAnimation(1);
  };

  collapseAnimation = () => {
    this.setState({searchText: ''});
    this.runAnimation(0);
  };

  runAnimation = (toValue) => {
    const {animated} = this.state;

    Animated.timing(animated, {
      duration: 400,
      useNativeDriver: false,
      toValue,
    }).start();
  };

  getIconContainerStyle = () => {
    const {searchEnabled = true} = this.props;

    return {opacity: searchEnabled ? 1 : 0};
  };

  render() {
    const {onSearchClick, title, placeholder} = this.props;
    const {searchText} = this.state;

    const iconContainerStyle = this.getIconContainerStyle();
    const titleStyle = this.getTitleStyle();

    return (
      <SafeAreaView style={Styles.containerStyle}>
        <View style={Styles.containerStyle}>
          <Animated.View style={titleStyle}>
            <Text style={Styles.titleStyle}>{title}</Text>
          </Animated.View>

          <TouchableOpacity
            onPress={this.expandAnimation}
            style={iconContainerStyle}>
            <Image source={R.Images.SearchIcon} style={Styles.iconStyle} />
          </TouchableOpacity>

          <TextInput
            placeholder={placeholder}
            value={searchText}
            style={Styles.searchFieldStyle}
            onChangeText={this.onSearchTextChange}
            returnKeyType="search"
            onSubmitEditing={() => {
              this.collapseAnimation();
              if (onSearchClick) {
                onSearchClick(searchText);
              }
            }}
          />

          <Text
            style={Styles.cancelButtonStyle}
            onPress={this.collapseAnimation}>
            Cancel
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
