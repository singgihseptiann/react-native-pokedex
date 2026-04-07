import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { usePokemons } from "../../hooks/usePokemons";
import { PokemonCard } from "../../components/PokemonCard";
import { ShimmerCard } from "../../components/ShimmerCard";

export function PokemonScreen() {
  const { pokemon, loading, loadMore, reset } = usePokemons();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokédex</Text>
        <Text style={styles.headerSub}>{pokemon.length} caught</Text>
      </View>

      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCard item={item} />}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          loading ? (
            <View style={styles.shimmerGrid}>
              {[1, 2, 3, 4].map((i) => (
                <ShimmerCard key={i} />
              ))}
            </View>
          ) : null
        }
      />

      <View style={styles.footer}>
        <Pressable style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.btnPressed]} onPress={loadMore}>
          <Text style={styles.btnPrimaryText}>Load More</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnGhost, pressed && styles.btnPressed]}
          onPress={reset}
        >
          <Text style={styles.btnGhostText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0A0A0A" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E1E1E",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  headerTitle: { fontSize: 28, fontWeight: "700", color: "#FFFFFF", letterSpacing: -0.5 },
  headerSub: { fontSize: 14, color: "#555", fontWeight: "400" },
  list: { padding: 6 },
  shimmerGrid: { flexDirection: "row", flexWrap: "wrap" },
  footer: {
    flexDirection: "row",
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#1E1E1E",
    backgroundColor: "#0A0A0A",
  },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  btnPrimary: { backgroundColor: "#FFFFFF" },
  btnPrimaryText: { color: "#0A0A0A", fontWeight: "700", fontSize: 14 },
  btnGhost: { borderWidth: 1, borderColor: "#2A2A2A" },
  btnGhostText: { color: "#888", fontWeight: "600", fontSize: 14 },
  btnPressed: { opacity: 0.75 },
});
