import React, { useState } from "react";
import { Input, Card, Button } from "react-native-elements";
import AppHeader from "../../components/AppHeader";
import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Modal from "react-native-modal";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Affected = ({ route }) => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const { equipement, client, localisation, type, reclamationId } =
    route.params;
  console.log("Reclamation ID:", reclamationId);
  console.log("Received route params:", route.params);
  useEffect(() => {
    // Utiliser le token dans votre logique de processus, par exemple,
    // effectuer des requêtes API authentifiées.
    console.log("Token dans l'interface de affected :", userInfo.token);
  }, [userInfo.token]);

  const [equipementText, setEquipementText] = useState(equipement);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAccept = async (newStatus) => {
    try {
      const res = await axios.post(
        `http://192.168.144.54:4000/api/rec/update/${reclamationId}/accepté`,
        { newStatus },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // Show the modal when the status is updated
      toggleModal();

      console.log("Status updated:", newStatus);
      console.log(res.data);
    } catch (error) {
      console.error("Error occurred while making the request:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  return (
    <View>
      <AppHeader />
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.row}>
          <Text style={styles.title}> Client :</Text>
          <Input
            value={client}
            onChangeText={(text) => setEquipementText(text)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}> Equipement :</Text>
          <Input
            value={equipementText}
            onChangeText={(text) => setEquipementText(text)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}> Localisation :</Text>
          <Input
            value={localisation}
            onChangeText={(text) => setEquipementText(text)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}> Type intervention :</Text>
          <Input
            value={type}
            onChangeText={(text) => setEquipementText(text)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
          />
        </View>
        <Button
          title="Accepter"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => handleAccept(route.params.reclamationId, "accepted")}
        />
      </Card>

      {/* Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Vous avez accepté la réclamation</Text>
          <Button
            title="OK"
            onPress={() => {
              toggleModal();
              navigation.navigate("Process");
            }}
            buttonStyle={styles.okButton}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Affected;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    borderColor: "#ddd", // Light gray border color
    borderWidth: 1, // Border width
  },
  row: {
    flexDirection: "row",
    marginBottom: -20,
  },
  title: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 15,
    marginTop: -10,
  },
  button: {
    backgroundColor: "red",
    height: 40,
    borderRadius: 15,
    width: 150,
    marginLeft: 100,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  okButton: {
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 10,
  },
});
