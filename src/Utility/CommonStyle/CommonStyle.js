const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },

  centerContent: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  wrapTextStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
  },

  appBackgroundColor: {
    backgroundColor: '#0462EA',
  },
});

export default styles;
