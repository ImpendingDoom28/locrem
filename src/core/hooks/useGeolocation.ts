import { useEffect, useLayoutEffect, useState } from "react";
import * as Location from "expo-location";

export const useGeolocation = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				return;
			}

			const locationPosition = await Location.getCurrentPositionAsync({});
			setLocation(locationPosition);
			setLoading(false);
		})();
	}, []);

	return {
		location,
		loading
	};
};