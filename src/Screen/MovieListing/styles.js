const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  searchContainerStyle: {
    flexDirection: 'row',
  },

  retryContainerStyle: {
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },

  retryTextStyle: {
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
});

export default styles;
