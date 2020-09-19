import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Styles from './styles';
import R from '../../Utility/R';

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

  render() {
    const {onSearchClick, title, searchTitle} = this.props;
    const {animated, searchText} = this.state;

    return (
      <SafeAreaView style={Styles.containerStyle}>
        <View style={Styles.containerStyle}>
          <TextInput
            placeholder="Search movie by title"
            value={searchText}
            style={Styles.searchFieldStyle}
            onChangeText={this.onSearchTextChange}
            returnKeyType="search"
            onSubmitEditing={() => {
              if (onSearchClick) {
                onSearchClick(searchText);
              }
            }}
          />

          <TouchableOpacity
            onPress={() => {
              if (onSearchClick) {
                onSearchClick(searchText);
              }
            }}>
            <Image source={R.Images.SearchIcon} style={Styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
