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
    marginRight: 10,
    marginTop: 10,
  },

  searchFieldStyle: {
    flex: 1,
    height: 40,
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    fontSize: 18,
  },
});

export default styles;
