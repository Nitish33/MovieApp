import React, {Component} from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';
import {connect} from 'react-redux';
import {startLoading} from './Action';
import R from '../../Utility/R';
import {FlatList} from 'react-native-gesture-handler';

class MovieListing extends Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({item, index}) => {
    return <Text>{item.title}</Text>;
  };

  render() {
    console.log('props are', this.props);
    const {error, loading, movies, totalResults} = this.props;

    return (
      <SafeAreaView style={R.CommonStyle.containerStyle}>
        <View style={[R.CommonStyle.centerContent]}>
          <Button
            title={'Start Loading'}
            onPress={() => {
              this.props.startLoading('love', 1);
              this.props.startLoading('love', 2);
            }}
          />
          <FlatList
            numColumns={2}
            data={movies}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => {
              return index;
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const movieData = state.MovieListing;
  const common = state.Common;

  const {movies, totalResults, error} = movieData;
  const {loading} = common;

  return {movies, totalResults, error, loading};
};

const mapDispatchToProps = (dispatch) => {
  return {startLoading: (text, page) => dispatch(startLoading(text, page))};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListing);
