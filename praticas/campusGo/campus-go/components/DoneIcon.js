import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function DoneIcon({ trigger, size = 40, color = '#16a34a' }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!trigger) return;
    scale.value = withSequence(withSpring(1.5), withSpring(1));
  }, [trigger]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name="checkmark-circle" size={size} color={color} />
    </Animated.View>
  );
}