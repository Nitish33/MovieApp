const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#0462EA',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },

  iconStyle: {
    width: 24,
    height: 24,
    tintColor: 'white',
    marginTop: 10,
  },

  searchFieldStyle: {
    flex: 1,
    height: 40,
    marginTop: 4,
    marginHorizontal: 20,
    backgroundColor: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: 'hidden',
    letterSpacing: 0.18,
  },

  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },

  cancelButtonStyle: {
    color: 'white',
    marginRight: 10,
    paddingVertical: 10,
  },
});

export default styles;
