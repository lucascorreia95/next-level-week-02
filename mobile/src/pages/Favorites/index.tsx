import React from "react";
import { View } from "react-native";

import PageHeader from "../../components/PageHeader";

import styles from "./styles";

export const Favorites = () => {
  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponiveis" />
    </View>
  );
};

export default Favorites;
