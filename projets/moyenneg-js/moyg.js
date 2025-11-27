// script.js — version robuste avec validation et écouteurs

document.getElementById('generateBtn').addEventListener('click', genererMatieres);

function genererMatieres() {
    const nbInput = document.getElementById('nbMatieres');
    const nb = parseInt(nbInput.value, 10);
    const form = document.getElementById('formMatieres');
    clearMessages();
    form.innerHTML = ''; // reset

    if (!nb || nb < 1) {
        showErreur("Indique un nombre de matières valide (≥ 1).");
        return;
    }

    for (let i = 1; i <= nb; i++) {
        const bloc = document.createElement('div');
        bloc.className = 'matiere-block';

        const titre = document.createElement('h3');
        titre.textContent = `Matière ${i}`;
        bloc.appendChild(titre);

        // Coefficient
        const labelCoeff = document.createElement('label');
        labelCoeff.textContent = 'Coefficient :';
        bloc.appendChild(labelCoeff);

        const inputCoeff = document.createElement('input');
        inputCoeff.type = 'number';
        inputCoeff.step = '0.1';
        inputCoeff.className = 'coeff';
        inputCoeff.placeholder = '';
        bloc.appendChild(inputCoeff);

        // Nombre de notes
        const labelNb = document.createElement('label');
        labelNb.textContent = 'Nombre de notes :';
        bloc.appendChild(labelNb);

        const inputNbNotes = document.createElement('input');
        inputNbNotes.type = 'number';
        inputNbNotes.min = '1';
        inputNbNotes.className = 'nbNotes';
        inputNbNotes.placeholder = '';
        bloc.appendChild(inputNbNotes);

        // container pour les notes
        const notesContainer = document.createElement('div');
        notesContainer.className = 'notes-container';
        bloc.appendChild(notesContainer);

        // quand on change le nombre de notes, générer les inputs
        inputNbNotes.addEventListener('input', function () {
            genererNotes(parseInt(this.value, 10), notesContainer);
        });

        form.appendChild(bloc);
    }

    // bouton calcul (type button pour éviter soumission)
    const calcBtn = document.createElement('button');
    calcBtn.type = 'button';
    calcBtn.textContent = 'Calculer la moyenne générale';
    calcBtn.addEventListener('click', calculerMoyenne);
    form.appendChild(calcBtn);
}

function genererNotes(nb, container) {
    container.innerHTML = ''; // reset
    if (!nb || nb < 1) {
        return;
    }

    for (let i = 1; i <= nb; i++) {
        const label = document.createElement('label');
        label.textContent = `Note ${i} :`;
        container.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '20';
        input.step = '0.1';
        input.className = 'note';
        input.placeholder = 'Sur 20';
        container.appendChild(input);
    }
}

function calculerMoyenne() {
    clearMessages();
    const matieres = document.querySelectorAll('.matiere-block');
    let totalPoints = 0;
    let totalCoeffs = 0;

    if (matieres.length === 0) {
        showErreur("Aucune matière renseignée. Commence par valider le nombre de matières.");
        return;
    }

    for (const m of matieres) {
        const coeffInput = m.querySelector('.coeff');
        const coeff = parseFloat(coeffInput.value);
        if (isNaN(coeff)) {
            showErreur("Un coefficient est manquant ou invalide. Veille à renseigner tous les coefficients.");
            return;
        }

        const notes = Array.from(m.querySelectorAll('.note'));
        if (notes.length === 0) {
            showErreur("Au moins une note par matière est requise.");
            return;
        }

        let somme = 0;
        for (const n of notes) {
            const val = parseFloat(n.value);
            if (isNaN(val)) {
                showErreur("Toutes les notes doivent être remplies et valides (0–20).");
                return;
            }
            if (val < 0 || val > 20) {
                showErreur("Les notes doivent être entre 0 et 20.");
                return;
            }
            somme += val;
        }

        const moyenne = somme / notes.length;
        totalPoints += moyenne * coeff;
        totalCoeffs += coeff;
    }

    if (totalCoeffs === 0) {
        showErreur("La somme des coefficients est nulle. Vérifie les coefficients.");
        return;
    }

    const moyenneGenerale = totalPoints / totalCoeffs;
    document.getElementById('resultat').textContent = `Moyenne générale : ${moyenneGenerale.toFixed(2)} / 20`;
}

function showErreur(msg) {
    const e = document.getElementById('erreur');
    e.textContent = msg;
    document.getElementById('resultat').textContent = '';
}

function clearMessages() {
    document.getElementById('erreur').textContent = '';
    document.getElementById('resultat').textContent = '';
}
