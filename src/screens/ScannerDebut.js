import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const ScannerDebut = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanData, setScanData] = useState(null);
  // const [scanTime, setScanTime] = useState(null);
  const [scanTimeDebut, setScanTimeDebut] = useState(null);
  const [scanDateDebut, setScanDateDebut] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [contact, setContact] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [fault_type, setFault_Type] = useState("");
  // const [handleOkFin , setHandleOkFin] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (route.params) {
      if (route.params.localisation) {
        setLocalisation(route.params.localisation);
        console.log(
          "Localisation extracted from phone ticket:",
          route.params.localisation
        );
      }
      if (route.params.contact) {
        setContact(route.params.contact);
        console.log(
          "Contact extracted from phone ticket:",
          route.params.contact
        );
      }
      if (route.params.fault_type) {
        setFault_Type(route.params.fault_type);
        console.log(
          "Fault type extracted from phone ticket:",
          route.params.fault_type
        );
      }
      if (route.params.numRapport) {
        console.log(
          "numRapport extracted from phone ticket:",
          route.params.numRapport
        );
      }
    }
  }, [route.params]);
  const handleOkDebut = async (FieldTicketId) => {
    console.log("ok appuyé");
    try {
      const currentTime = new Date().toISOString();

      const response = await fetch(`http://192.168.123.54:4000/api/fiche/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateDebut: scanDateDebut,
          heureDebut: scanTimeDebut,
          FieldTicketId: FieldTicketId,
          
          numRapport: route.params.numRapport,
          fault_type: route.params.fault_type,
          localisation: route.params.localisation,
          contact: route.params.contact,
         
        }),
      });

      if (response.ok) {
        console.log(
          "Success Stocking Fiche Intervention Debut with Id",
          FieldTicketId
        );
        // Si la fiche de début est ajoutée avec succès, appeler handleOkFin avec le même numéro de rapport
        //  await handleOkFin(FieldTicketId);
        navigation.navigate("FieldTicket");
      } else {
        const errorResponse = await response.json();
        console.error("Error Response:", errorResponse);
        throw new Error("Sauvegarde Fiche a échoué");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    const currentTime = new Date();
    setScanData(data);
    //  setScanTime(currentTime);
    setScanTimeDebut(currentTime);
    setScanDateDebut(currentTime);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
    console.log(`Scan Time: ${currentTime}`);

    // Ouvrir le modal lorsque le scan est terminé
    toggleModal();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Fiche intervention</Text>

          <View style={styles.formRow}>
            <Text style={styles.label}>Adresse</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setLocalisation(text)}
              value={localisation}
              placeholder="Adresse"
              editable={false}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setContact(text)}
              value={contact}
              placeholder="Contact"
              editable={false}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>FaultType</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFault_Type(text)}
              value={fault_type}
              placeholder="fault_type"
              editable={false}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Date Debut</Text>
            <TextInput
              value={
                scanDateDebut
                  ? new Date(scanDateDebut).toLocaleDateString()
                  : ""
              }
              editable={false}
              style={[styles.input, styles.dateInput, { color: "black" }]}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Heure Debut</Text>
            <TextInput
              value={
                scanTimeDebut
                  ? new Date(scanTimeDebut).toLocaleTimeString()
                  : ""
              }
              style={[styles.input, styles.dateInput, { color: "black" }]}
              editable={false}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOkDebut(route.params.FieldTicketId)}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle} />
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rectangle: {
    height: width * 0.7,
    width: width * 0.7,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "transparent",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  formRow: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  label: {
    width: 100, // Ajustez la largeur du label selon vos besoins
    marginRight: 10,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  input: {
    flex: 1, // Le champ de saisie prendra le reste de l'espace disponible
    height: 40,
    borderColor: "#C0C1C1",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    color: "black",
    fontFamily: "Poppins-Regular",
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    width: 90,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScannerDebut;
