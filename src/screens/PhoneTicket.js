import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal, // Importez Modal
  TextInput, // Importez TextInput pour le formulaire
  Button, // Importez Button pour le bouton dans le formulaire
} from "react-native";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/FontAwesome";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
const PhoneTicket = ({ route }) => {
  const navigation = useNavigation();
  const [phoneTickets, setPhoneTickets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [adress, setAdress] = useState("");
  const [fault_type, setFault_Type] = useState("");
  const [contact, setContact] = useState("");
  const [heureDebut, setHeureDebut] = useState("");

  // Fonction pour afficher le modal
  const toggleModal = (phoneTicketData) => {
    setAdress(phoneTicketData.localisation);
    setContact(phoneTicketData.contact);
    setFault_Type(phoneTicketData.fault_type);
    setModalVisible(!modalVisible);
  };

  const showToast = () => {
    console.log("Toast clicked");
    ToastAndroid.showWithGravityAndOffset(
      "Good Work",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      50,
      50
    );
  };

  const handleStart = async (phoneticketId, phoneTicketData) => {
    console.log("phoneticketId", phoneticketId);
    console.log("phoneTicketData", phoneTicketData);
    try {
      console.log("Updating phone ticket with ID:", phoneticketId);
      const response = await fetch(
        `http://192.168.123.54:4000/api/phone/status/${phoneticketId}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        console.log("Success updating ticket");
        navigation.navigate("ScannerDebut", {
          contact: phoneTicketData.contact,
          localisation: phoneTicketData.localisation,
          fault_type: phoneTicketData.fault_type,
        });
        
      } else {
        const error = await response.json();
        throw new Error(`La mise à jour du ticket a échoué : ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    fetch("http://192.168.123.54:4000/api/phone/all")
      .then((response) => response.json())
      .then((data) => {
        setPhoneTickets(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "assigned":
        return "#FF69B4"; // Pink
      case "accepted":
        return "#1582e8"; // Bleu ciel
      case "Depart":
        return "#f2df11"; // Jaune
      case "Enroute":
        return "#F6e10e"; // Grey
      case "Arrived":
        return "grey"; // Orange
      case "Started":
        return "#FFA500"; // Orange
      case "Solving":
        return "#FFA500"; // Orange
      case "Solved":
        return "black"; // Vert
      default:
        return "#000000"; // Noir par défaut
    }
  };

  const getButtonColor = (status) => {
    switch (status) {
      case "assigned":
        return "#BDC3C7"; // Pink
      case "accepted":
        return "#BDC3C7"; // Bleu ciel
      case "Depart":
        return "#BDC3C7"; // Jaune
      case "Enroute":
        return "#BDC3C7"; // Grey
      case "Arrived":
        return "#BDC3C7"; // Orange
      case "Started":
        return "#BDC3C7"; // Orange
      case "Solving":
        return "#BDC3C7"; // Orange
      case "Solved":
        return "#BDC3C7"; // Vert
      default:
        return "#000000"; // Noir par défaut
    }
  };
  const handleAccepter = async (phoneticketId) => {
    console.log("phoneticketId", phoneticketId);
    try {
      console.log("Updating phone ticket with ID:", phoneticketId);
      const response = await fetch(
        `http://192.168.123.54:4000/api/phone/status/${phoneticketId}`,
        {
          method: "PUT", // Utilisez PUT au lieu de DELETE
        }
      );
      if (response.ok) {
        console.log("Success updating ticket");
        // Afficher le toast de succès
        showToast({
          type: "success",
          text1: "Succès",
          text2: "Vous avez accepté le ticket",
        });
        setModalVisible(true);
      } else {
        const error = await response.json();
        throw new Error(`La mise à jour du ticket a échoué : ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      // Afficher le toast d'erreur
      showToast({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };

  const handleDepart = async (phoneticketId) => {
    console.log("phoneticketId", phoneticketId);
    try {
      console.log("Updating phone ticket with ID:", phoneticketId);
      const response = await fetch(
        `http://192.168.123.54:4000/api/phone/status/${phoneticketId}`,
        {
          method: "PUT", // Utilisez PUT au lieu de DELETE
        }
      );
      if (response.ok) {
        console.log("Success updating ticket");
        // Afficher le toast de succès
        showToast({
          type: "success",
          text1: "Succès",
          text2: "Vous avez accepté le ticket",
        });
      } else {
        const error = await response.json();
        throw new Error(`La mise à jour du ticket a échoué : ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      // Afficher le toast d'erreur
      showToast({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
  const handleCloturer = async (phoneticketId) => {
    console.log("phoneticketId", phoneticketId);
    try {
      console.log("Updating phone ticket with ID:", phoneticketId);
      const response = await fetch(
        `http://192.168.123.54:4000/api/phone/status/${phoneticketId}`,
        {
          method: "PUT", // Utilisez PUT au lieu de DELETE
        }
      );
      if (response.ok) {
        console.log("Success updating ticket");
        // Afficher le toast de succès

        navigation.navigate("ScannerFin");
      } else {
        const error = await response.json();
        throw new Error(`La mise à jour du ticket a échoué : ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      // Afficher le toast d'erreur
      showToast({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
  useEffect(() => {
    if (route.params?.scanTime) {
      // Update heureDebut with scan time when available
      setHeureDebut(route.params.scanTime.toString());
    }
  }, [route.params?.scanTime]);

  // Function to handle opening the scanner
  const handleStartScan = () => {
    // navigation.navigate("ScannerDebut"); // Navigate to the scanner component
  };
  const handleArrived = async (phoneticketId) => {
    console.log("phoneticketId", phoneticketId);
    try {
      console.log("Updating phone ticket with ID:", phoneticketId);
      const response = await fetch(
        `http://192.168.123.54:4000/api/phone/status/${phoneticketId}`,
        {
          method: "PUT", // Utilisez PUT au lieu de DELETE
        }
      );
      if (response.ok) {
        console.log("Success updating ticket");
        // Afficher le toast de succès
        showToast({
          type: "success",
          text1: "Succès",
          text2: "Vous avez accepté le ticket",
        });
      } else {
        const error = await response.json();
        throw new Error(`La mise à jour du ticket a échoué : ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      // Afficher le toast d'erreur
      showToast({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text
          style={[styles.ticketText, { color: getStatusColor(item.status) }]}
        >
          {item.status}
        </Text>
        <Text>{item.localisation}</Text>
        <Text>{item.contact}</Text>
        <Text>{item.fault_type}</Text>
        <Text>{item.created_at}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: getButtonColor(item.status) },
        ]}
        onPress={() => {
          switch (item.status) {
            case "assigned":
              handleAccepter(item._id);
              break;
            case "accepted":
              handleDepart(item._id);
              break;
            case "Enroute":
              handleArrived(item._id);
              break;
            case "Arrived":
              handleStart(item._id, item);
              break;
            case "Solving":
              handleCloturer(item._id);
              break;
            default:
              break;
          }
        }}
      >
        <Text style={styles.buttonText}>
          {item.status === "assigned"
            ? "Accepter"
            : item.status === "accepted"
            ? "Depart"
            : item.status === "Depart"
            ? "Arrived"
            : item.status === "Enroute"
            ? "Arrived"
            : item.status === "Arrived"
            ? "Start"
            : item.status === "Solving"
            ? "Solved"
            : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <AppHeader />
      <FlatList
        data={phoneTickets}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Fiche inervention</Text>
          <View style={styles.formRow}>
            <Text style={styles.label}>contact</Text>
            <TextInput
              style={styles.input}
              //   value={formInput}
              placeholder="contact"
              editable={false}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Adresse</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAdress(text)}
              value={adress}
              placeholder="adress"
              editable={false}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Fault Type</Text>
            <TextInput
              style={styles.input} 
              onChangeText={(text) => setFault_Type(text)}
              value={fault_type}
              placeholder="contact"
              editable={false}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleStartScan} // Call handleStartScan when the button is pressed
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "orange", // Couleur de fond du bouton
    padding: 10,
    borderRadius: 10, // Bord arrondi
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Couleur du texte
    fontWeight: "bold", // Texte en gras
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
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    //  fontWeight: "bold",
    fontWeight: "400",
    color: "orange",
    fontFamily: "Poppins-Regular",
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  },
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  ticketText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PhoneTicket;
