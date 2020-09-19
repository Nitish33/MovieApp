const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
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
});

export default styles;
