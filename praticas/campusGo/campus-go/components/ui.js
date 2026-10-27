import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const colors = {
  bg: '#F4F6F5',
  surface: '#FFFFFF',
  ink: '#10231E',
  muted: '#5B6B66',
  line: '#E2E8E5',
  primary: '#0F5D4F',
  accent: '#F2B134',
  danger: '#B42318',
  dangerBg: '#FDECEA',
};

export function Button({ title, onPress, variant = 'primary', icon, disabled, style }) {
  const isPrimary = variant === 'primary';
  const textColor = isPrimary ? '#FFFFFF' : colors.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.buttonPrimary : styles.buttonSecondary,
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={textColor} /> : null}
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonText: { fontSize: 15, fontWeight: '700' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
  },
});