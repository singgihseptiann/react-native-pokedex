import { useState, useEffect } from "react";
import { Pokemon } from "../types";
import { getPokemons } from "../api/getPokemons";

export const usePokemons = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState<Error | null>(null);

  const fetchPokemon = async (fetchLimit: number) => {
    setLoading(true);
    setError(null);
    try {
      const detailed = await getPokemons(fetchLimit);
      setPokemon(detailed);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e : new Error('Failed to fetch Pokemon'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(limit);
  }, [limit]);

  const loadMore = () => setLimit((p) => p + 10);
  
  const reset = () => {
    setPokemon([]);
    setLimit(10);
  };

  return {
    pokemon,
    loading,
    limit,
    error,
    loadMore,
    reset,
  };
};
