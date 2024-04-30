import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Icon } from "react-native-elements";
import AppHeader from "../components/AppHeader";

const Alerte = () => {
  const [alertData, setAlertData] = useState([]);

  useEffect(() => {
    const fetchAlertes = async () => {
      try {
        const response = await fetch("http://192.168.123.54:3000/api/alr/all", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        // Assuming the API returns an array of alerts, you can set it in the state
        setAlertData(data);
      } catch (error) {
        console.error("Error fetching alert data:", error);
      }
    };

    fetchAlertes();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <>
      <AppHeader />
      {alertData.map((alert, index) => (
        <Card key={index} containerStyle={styles.cardContainer} elevation={5}>
          <Icon
            name="warning"
            type="material"
            color="#fff"
            size={30}
            containerStyle={styles.iconContainer}
          />
          <View>
            <Text style={styles.label}>Client:</Text>
            <Text style={styles.value}>{alert.client}</Text>
          </View>
          <View>
            <Text style={styles.label}>Date de reception:</Text>
            <Text style={styles.value}>{alert.heure_reception}</Text>
          </View>
        </Card>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFD8D8", // Rouge clair
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: "#FF5E5E", // Rouge foncé
    borderRadius: 50,
    padding: 10,
    alignSelf: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    color: "black",
  },
});

export default Alerte;
