import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, TextInput, Button, Text } from "react-native-paper";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import HeureDebut from "../../api/HeureDebut";
import { Modal } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
const StartRapport = ({ route }) => {
  const { client, equipement, localisation, type, reclamationId } =
    route.params;
  const [user, setUser] = useState(null);
  const [scanTime, setScanTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [interventionStarted, setInterventionStarted] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const [dateDebut, setdateDebut] = useState(null);
  const navigation = useNavigation();

  const showInterventionPopup = () => {
    setShowModal(true);
  };
  useEffect(() => {
    if (userInfo && userInfo._id) {
      setUser(userInfo._id);
    }
  }, [userInfo]);
  useEffect(() => {
    if (route.params) {
      if (route.params.scanTime) {
        const scannedTime = new Date(route.params.scanTime);
        setScanTime(scannedTime.toISOString());
        console.log("la valeur extraite", scannedTime);
      }
    }
  }, [route.params]);

  useEffect(() => {
    console.log("Token dans l'interface de affected :", userInfo.token);
  }, [userInfo.token]);

  const handleSave = async () => {
    try {
      const formData = {
        user,
        dateDebut,
        dateFin,
        type,
        client,
        numRapport,
        description,
      };

      const res = await axios.post(
        "http://192.168.144.54:4000/api/inter/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleString();

      console.log("Type:", type);
      console.log("Client:", client);
      console.log("Numéro de rapport:", numRapport);
      console.log("Description:", description);
      console.log("Current Time:", formattedTime);

      console.log("Reclamation ID:", reclamationId);
      console.log("Scan Time in AcceptRapport:", scanTime);

      setInterventionStarted(true);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  useEffect(() => {
    const performPostScanTasks = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showInterventionPopup();
    };

    if (interventionStarted) {
      performPostScanTasks();
    }
  }, [interventionStarted]);
  return (
    <>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.dateContainer}>
                <View style={{ width: 170 }}>
                  <Text style={styles.label}>Heure de début</Text>
                  <TextInput
                    value={
                      scanTime ? new Date(scanTime).toLocaleTimeString() : ""
                    }
                    style={[styles.input, styles.dateInput]}
                    editable={false}
                  />
                </View>

                <View style={{ width: 170 }}>
                  <Text style={styles.label}>Date de début</Text>
                  <TextInput
                    value={
                      scanTime ? new Date(scanTime).toLocaleDateString() : ""
                    }
                    editable={false}
                    onChangeText={(text) => setDateDebut(text)}
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
                value={route.params.client}
                onChangeText={(text) => setClient(text)}
                editable={false}
                style={styles.input}
              />
              <Text style={styles.label}>Equipement</Text>
              <TextInput
                value={equipement}
                onChangeText={(text) => setEquipement(text)}
                editable={false}
                style={styles.input}
              />
              <Text style={styles.label}>Localisation</Text>
              <TextInput
                value={localisation}
                onChangeText={(text) => setlocalisation(text)}
                editable={false}
                style={styles.input}
              />
            </Card.Content>
            <Card.Actions style={styles.buttonContainer}>
              <Button
                style={{ backgroundColor: "#f61f87", borderColor: "#f61f87" }}
                onPress={handleSave}
              >
                <Text style={{ color: "white" }}> Start </Text>
              </Button>
            </Card.Actions>
          </Card>
          <Modal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Vous avez débuté l'intervention
              </Text>
              <Button
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("Scanner");
                }}
                style={styles.modalButton}
              >
                <Text style={{ color: "white" }}>OK</Text>
              </Button>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#f61f87",
    borderColor: "#f61f87",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    padding: 16,
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
    borderColor: "white",
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
    //  justifyContent: "center",
    marginRight: 110,
  },
});

export default StartRapport;
