import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#efefef',
    overflow: 'hidden',
  },

  imageStyle: {
    width: '100%',
    height: 200,
  },

  infoContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 50,
    backgroundColor: 'white',
    padding: 5,
  },

  titleContainerStyle: {
    flex: 1,
  },

  saveButtonStyle: {
    width: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  heartIconStyle: {
    width: 24,
    height: 24,
  },
});

export default styles;
