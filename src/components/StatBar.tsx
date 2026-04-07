import { View, StyleSheet } from "react-native";

interface StatBarProps {
  value: number;
  color: string;
}

export function StatBar({ value, color }: StatBarProps) {
  const pct = Math.min(value / 255, 1);
  return (
    <View style={styles.statTrack}>
      <View style={[styles.statFill, { width: `${pct * 100}%` as any, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  statTrack: { flex: 1, height: 3, backgroundColor: "#FFFFFF14", borderRadius: 2, overflow: "hidden" },
  statFill: { height: "100%", borderRadius: 2 },
});
