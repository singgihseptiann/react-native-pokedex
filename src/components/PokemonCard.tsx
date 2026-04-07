import { useRef } from "react";
import { View, Text, Image, Pressable, Animated, StyleSheet } from "react-native";
import { Pokemon } from "../types";
import { getTheme } from "../utils/getTheme";
import { StatBar } from "./StatBar";

interface PokemonCardProps {
  item: Pokemon;
}

export function PokemonCard({ item }: PokemonCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const types = Array.isArray(item.types) ? item.types : [];
  const theme = getTheme(types[0] ?? "normal");

  const onPress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true })
    ]).start();
  };

  return (
    <Pressable onPress={onPress} style={{ flex: 1, margin: 7 }}>
      <Animated.View style={[styles.card, { backgroundColor: theme.bg, transform: [{ scale }] }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.pokemonId, { color: theme.accent + "88" }]}>
            #{String(item.id).padStart(3, "0")}
          </Text>
          <View style={styles.typesRow}>
            {types.map((t) => (
              <View key={t} style={[styles.typeBadge, { backgroundColor: getTheme(t).badge }]}>
                <Text style={[styles.typeText, { color: getTheme(t).text }]}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>

        <View style={styles.imageRow}>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          {item.imageBack && <Image source={{ uri: item.imageBack }} style={[styles.image, styles.imageBack]} />}
        </View>

        <View style={styles.stats}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.accent }]}>HP</Text>
            <StatBar value={item.stats.hp} color={theme.accent} />
            <Text style={[styles.statVal, { color: theme.text }]}>{item.stats.hp}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.accent }]}>ATK</Text>
            <StatBar value={item.stats.attack} color={theme.accent} />
            <Text style={[styles.statVal, { color: theme.text }]}>{item.stats.attack}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.accent }]}>SPD</Text>
            <StatBar value={item.stats.speed} color={theme.accent} />
            <Text style={[styles.statVal, { color: theme.text }]}>{item.stats.speed}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  pokemonId: { fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  typesRow: { flexDirection: "row", gap: 4 },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  typeText: { fontSize: 9, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  name: { fontSize: 15, fontWeight: "700", textTransform: "capitalize", marginBottom: 2, letterSpacing: -0.2 },
  imageRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 4 },
  image: { width: 72, height: 72 },
  imageBack: { opacity: 0.6, transform: [{ scaleX: -1 }] },
  stats: { marginTop: 6, gap: 4 },
  statRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  statLabel: { fontSize: 9, fontWeight: "700", width: 26, letterSpacing: 0.5 },
  statVal: { fontSize: 10, fontWeight: "600", width: 22, textAlign: "right" },
});
