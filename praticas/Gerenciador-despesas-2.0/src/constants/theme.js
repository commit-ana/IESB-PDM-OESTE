export const COLORS = {
  light: {
    background: '#F4F4F4',
    card: '#FFFFFF',
    text: '#222222',
    textSecondary: '#666666',
    primary: '#3B5BDB',
    primaryText: '#FFFFFF',
    chip: '#E5E5E5',
    chipText: '#333333',
    summary: '#E8ECFF',
    border: '#CCCCCC',
    error: '#D32F2F',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    background: '#121214',
    card: '#1E1E22',
    text: '#F2F2F7',
    textSecondary: '#A0A0A8',
    primary: '#748FFC',
    primaryText: '#121214',
    chip: '#2C2C31',
    chipText: '#E0E0E5',
    summary: '#23284A',
    border: '#3A3A40',
    error: '#FF6B6B',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

// Recebe o valor de useColorScheme() ('light', 'dark' ou null)
export function getColors(scheme) {
  return scheme === 'dark' ? COLORS.dark : COLORS.light;
}