import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const pos = await Location.getCurrentPositionAsync({});
  const coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;

  let label = '';
  try {
    const [address] = await Location.reverseGeocodeAsync(pos.coords);
    if (address) {
      label = [address.street, address.district, address.city].filter(Boolean).join(', ');
    }
  } catch (e) {}

  return { ...pos.coords, label: label || coords };
}