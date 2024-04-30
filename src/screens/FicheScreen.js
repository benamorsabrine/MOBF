import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, parameters } from "../global/styles";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../components/AppHeader";
const FicheInter = ({ data, input, setInput }) => {
  const [interventions, setInterventions] = useState([]); // Define the state

  const navigation = useNavigation();

  useEffect(() => {
    const fetchInterventions = async () => {
      try {
        const response = await fetch(
          "http://192.168.123.54:4000/api/fiche/:id",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Log the entire response for debugging purposes
        console.log("Server Response:", data);

        // Assuming the data structure is correct, proceed with further processing

        setInterventions(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchInterventions();
  }, []);

  return (
    <>
      <AppHeader> </AppHeader>
      <View style={styles.container}>
        <Text style={styles.titre}>Fiche Interventions</Text>
        <FlatList
          data={interventions}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Text style={styles.te}>
                  <Text style={styles.t}>NumRapport:</Text> {item.numRapport}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Date Debut :</Text> {item.dateDebut}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Heure Debut :</Text> {item.heureDebut}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Date Fin :</Text> {item.dateFin}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Heure Fin :</Text> {item.heureFin}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Description :</Text> {item.description}
                </Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => {
                    navigateToDetails(item);
                  }}
                >
                  <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </>
  );
};

export default FicheInter;

const styles = StyleSheet.create({
  titre: {
    fontFamily: "Poppins-Regular",
    fontSize: 23,
  },
  detailsButton: {
    marginTop: 90,
    // backgroundColor: "black",
    borderRadius: 8,
    padding: 10,
    marginLeft: 240,
  },
  detailsButtonText: {
    color: "gray",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 50,
    padding: 9,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 23,
    marginLeft: 15,
    marginBottom: 5,
    color: "black",
    textAlign: "center",
  },
  t: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  te: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
    color: "#696969",
  },
  card: {
    borderRadius: 15,
    padding: 16,
    cursor: "pointer",
    backgroundColor: "#f1f1f3",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    position: "relative",
    height: 180,
    marginTop: 10,
  },
});
