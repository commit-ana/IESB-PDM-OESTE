import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function FadeIn({ children, delay = 0, style }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={[{ opacity }, style]}>{children}</Animated.View>;
}