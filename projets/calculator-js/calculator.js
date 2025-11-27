function ajouter(val) {
  document.getElementById("ecran").value += val;
}

function effacer() {
  document.getElementById("ecran").value = "";
}

function calculer() {
  try {
    document.getElementById("ecran").value = eval(document.getElementById("ecran").value);
  } catch {
    alert("Expression invalide");
  }
}
