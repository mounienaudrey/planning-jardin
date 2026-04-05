let planning = JSON.parse(localStorage.getItem("planning")) || [];

function ajouterTache() {
  let client = document.getElementById("client").value;
  let date = document.getElementById("date").value;
  let prestation = document.getElementById("prestation").value;

  if (client === "" || date === "" || prestation === "") {
    alert("Remplis tous les champs !");
    return;
  }

  // anti doublon
  let existe = planning.some(t =>
    t.client === client && t.date === date && t.prestation === prestation
  );

  if (existe) {
    alert("Cette tâche existe déjà !");
    return;
  }

  planning.push({ client, date, prestation });

  localStorage.setItem("planning", JSON.stringify(planning));

  afficherPlanning();

  // vider champs
  document.getElementById("client").value = "";
  document.getElementById("date").value = "";
  document.getElementById("prestation").value = "";
}

function afficherPlanning() {
  let liste = document.getElementById("planning");
  liste.innerHTML = "";

  planning.sort((a, b) => a.date.localeCompare(b.date));

  planning.forEach((tache, index) => {

    let parties = tache.date.split("-");
    let dateFormatee = parties[2] + "/" + parties[1] + "/" + parties[0];

    let li = document.createElement("li");

    li.textContent = dateFormatee + " - " + tache.client + " (" + tache.prestation + ")";

    // bouton supprimer
    let btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      planning.splice(index, 1);
      localStorage.setItem("planning", JSON.stringify(planning));
      afficherPlanning();
    };

    li.appendChild(btn);
    liste.appendChild(li);
  });
}

afficherPlanning();