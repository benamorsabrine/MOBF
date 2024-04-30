import React, { useState } from "react";
import { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, TextInput, Button, Text } from "react-native-paper";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import Pickphoto from "../../components/Camera";
import Axios from "axios";

const SolvingRapport = ({ route }) => {
  const { client, telephone, localisation, equipement, type } = route.params;
  const [user, setUser] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const navigation = useNavigation();
  const [heureDeDebut, setHeureDeDebut] = useState("");

  const [numRapport, setNumRapport] = useState("");
  const [description, setDescription] = useState("");
  const [scanTimeFin, setScanTimeFin] = useState("null");
  const handleSend = async () => {
    try {
      // Make a POST request to your backend API endpoint for storing the form data
      const res = await Axios.post(
        "http://192.168.144.54:4000/api/rec/storeData",
        {
          user,
          dateDebut,
          dateFin,
          type,
          client,
          numRapport,
          description,
        }
      );

      console.log("Form data stored successfully:", res.data);

      // Navigate to the Scanner screen or any other screen as needed
      navigation.navigate("Scanner");
    } catch (error) {
      console.error("Error storing form data:", error);
    }
  };
  useEffect(() => {
    console.log("Client:", client);
    console.log("Téléphone:", telephone);
    console.log("Localisation:", localisation);
    console.log("Equipement", equipement);
    console.log("type :", type);

    if (route.params) {
      setScanTimeFin(route.params.scanTimeFin);
    }
  }, [client, telephone, localisation, equipement, route.params]);

  const handleSave = async (reclamationId, newStatus) => {
    try {
      const res = await Axios.post(
        `http://192.168.183.54:3000/api/rec/update/{reclamationId}/cloturé`,
        { reclamationId, newStatus }
      );
    } catch (error) {
      console.log("Erreur updatet statu cloture ", error);
    }
    console.log("User:", user);
    console.log("Date de début:", dateDebut);
    console.log("Date de fin:", dateFin);
    console.log("Type:", type);
    console.log("Client:", client);
    console.log("Numéro de rapport:", numRapport);
    console.log("Description:", description);

    const scanTimeFin =
      route.params && route.params.scanTimeFin
        ? route.params.scanTimeFin.toISOSTRING()
        : null;
    console.log("Scan time in solvingRapport", scanTimeFin);
    // Ajoutez ici la logique pour sauvegarder les données dans votre backend ou stockage approprié
    navigation.navigate("Scanner");
  };

  return (
    <>
      <AppHeader></AppHeader>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={{ fontSize: 20, marginLeft: 90, color: "#5d676a" }}>
                Fiche Intervention
              </Text>
              <Text style={styles.label}>User</Text>
              <TextInput
                value={user}
                onChangeText={(text) => setUser(text)}
                style={styles.input}
              />
              <View style={styles.dateContainer}>
                <View style={{ width: 170 }}>
                  <Text style={styles.label}>Date debut</Text>
                  <TextInput
                    value={dateDebut}
                    editable={false}
                    style={[styles.input, styles.dateInput]}
                  />
                </View>

                <View style={{ width: 170 }}>
                  <Text style={styles.label}>Date fin</Text>
                  <TextInput
                    editable={false}
                    value={
                      scanTimeFin
                        ? new Date(scanTimeFin).toLocaleDateString()
                        : ""
                    }
                    style={[styles.input, styles.dateInput]}
                  />
                </View>
              </View>
              <View style={styles.dateContainer}>
                <View style={{ width: 170 }}>
                  <Text style={styles.label}>Heure de début</Text>
                  <TextInput
                    value={dateDebut}
                    editable={false}
                    style={[styles.input, styles.dateInput]}
                  />
                </View>

                <View style={{ width: 170 }}>
                  <Text style={styles.label}>Heure de fin</Text>
                  <TextInput
                    editable={false}
                    value={
                      scanTimeFin
                        ? new Date(scanTimeFin).toLocaleTimeString()
                        : ""
                    }
                    style={[styles.input, styles.dateInput]}
                  />
                </View>
              </View>
              <Text style={styles.label}>Type Intervention</Text>
              <TextInput
                value={type}
                onChangeText={(text) => setType(text)}
                style={styles.input}
                editable={false}
              />
              <Text style={styles.label}>Client</Text>
              <TextInput
                editable={false}
                value={client}
                onChangeText={(text) => setClient(text)}
                style={styles.input}
              />
              <Text style={styles.label}>Equipement</Text>
              <TextInput
                editable={false}
                value={equipement}
                onChangeText={(text) => setEquipement(text)}
                style={styles.input}
              />
              <Text style={styles.label}>Localisation</Text>
              <TextInput
                value={localisation}
                editable={false}
                onChangeText={(text) => setlocalisation(text)}
                style={styles.input}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
              />
            </Card.Content>
            <Card.Actions style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleSave}>
                Cloturer
              </Button>
            </Card.Actions>
            <Card.Actions style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleSend}>
                Send
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    padding: 16,
    flexDirection: "row",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#495458",
  },
  input: {
    marginVertical: 8,
    fontFamily: "Poppins-Regular",
    backgroundColor: "white",
    color: "#495458",
    borderRadius: 5,
    height: 40,
  },
  dateContainer: {
    flexDirection: "row",
    //justifyContent: "space-between",
    height: 70,
  },
  dateInput: {
    flex: 1,
    marginRight: 8,
  },
  buttonContainer: {
    justifyContent: "center",
  },
});

export default SolvingRapport;
