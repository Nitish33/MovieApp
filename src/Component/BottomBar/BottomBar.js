import React from 'react';
import {
  SafeAreaView,
  Animated,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('screen');

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);

    const {
      navigationProps: {
        state: {index: currentTab},
      },
    } = props;

    this.state = {
      barAnimation: new Animated.Value(currentTab),
    };
  }

  getBarTransitionStyle = () => {
    const {barAnimation} = this.state;
    const {
      navigationProps: {
        state: {routes},
      },
    } = this.props;

    const noOfTabs = routes.length;
    const singleTabWidth = width / noOfTabs;

    console.log('no of tabs is', noOfTabs);

    const interpolation = barAnimation.interpolate({
      inputRange: [0, noOfTabs],
      outputRange: [0, width],
    });

    return {
      transform: [{translateX: interpolation}],
      width: singleTabWidth,
      marginTop: 11,
      height: 3,
      backgroundColor: '#0462EA',
    };
  };

  animatedBarToValue = (toValue) => {
    const {barAnimation} = this.state;

    Animated.timing(barAnimation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {navigationProps} = this.props;
    const {
      activeTintColor,
      inactiveTintColor,
      state,
      descriptors,
      navigation,
    } = navigationProps;

    const barTransitionStyle = this.getBarTransitionStyle();

    console.log('navigator is', navigationProps);

    return (
      <View style={{backgroundColor: '#dfdfdf'}}>
        <View style={{flexDirection: 'row'}}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];

            const isFocused = state.index === index;

            const label = options.tabBarLabel || options.title || route.name;
            const color =
              (isFocused ? activeTintColor : inactiveTintColor) || 'gray';

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);

                this.animatedBarToValue(index);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const icon = options.tabBarIcon({
              focused: isFocused,
              size: 18,
              color,
            });

            const opacity = 1;

            return (
              <TouchableOpacity
                accessibilityRole="button"
                //   accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  paddingTop: 16,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                {icon}
                <Animated.Text style={[{opacity, color, marginTop: 5}]}>
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Animated.View style={barTransitionStyle} />
      </View>
    );
  }
}
