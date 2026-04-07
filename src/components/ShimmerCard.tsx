import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export function ShimmerCard() {
  const anim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true })
      ])
    ).start();
  }, [anim]);
  
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });
  
  return (
    <Animated.View 
      style={[
        styles.card, 
        { backgroundColor: "#1E1E1E", opacity, flex: 1, margin: 6, height: 200 }
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFFFFF08",
  },
});
