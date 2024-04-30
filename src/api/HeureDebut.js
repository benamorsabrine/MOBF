// api.js

const HeureDebut = async (reclamationId, nouvelleHeureDebut) => {
  try {
    const response = await fetch(
      `http://192.168.154.54:3000/api/rec/${reclamationId}/heureDebut`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ heureDebut: nouvelleHeureDebut }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la mise à jour de l'heure de début: ${response.statusText}`
      );
    }

    const reclamation = await response.json();
    console.log(
      "Réclamation mise à jour avec la nouvelle heure de début:",
      reclamation
    );
    return reclamation;
  } catch (error) {
    console.error("Erreur:", error.message);
    throw error;
  }
};
export default HeureDebut;
