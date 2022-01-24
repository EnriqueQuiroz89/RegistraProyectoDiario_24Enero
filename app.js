console.log("Saludos Programaaaaer");

//Ingresa los datos de tu proyecto en Firebase
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC7IxVax8cZ5eLwEhlHE5leNVlX7TBUIQ0",
    authDomain: "firestorecrud-f8226.firebaseapp.com",
    projectId: "firestorecrud-f8226",
});

var db = firebase.firestore();

/**INGRESA DOCUMENTOS*/
function guardar() {
    // Capturamos el contenido de el formulario
    var fecha = document.getElementById('fecha').value;
    var titulo = document.getElementById('titulo').value;
    var website = document.getElementById('website').value;
    var repositorio = document.getElementById('repositorio').value;
    var descripcion = document.getElementById('descripcion').value;

    // Creamos la instacia para insertar en la BAse de datos
    db.collection("practicas").add({
        date: fecha,
        title: titulo,
        website: website,
        repository: repositorio,
        description: descripcion,
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            // Limpia los campos
            document.getElementById('fecha').value = "";
            document.getElementById('titulo').value = "";
            document.getElementById('website').value = "";
            document.getElementById('repositorio').value = "";
            document.getElementById('descripcion').value = "";

        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

/**CONSULTA DOCUMENTOS*/
var tabla = document.getElementById('tabla');
// Quiero update en tiempo real con ONSNAPSHOT
db.collection("practicas").onSnapshot((querySnapshot) => {
    // Borra el contenido de la tabla antes de mostrar la consulta
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().date}`);
        tabla.innerHTML += `<tr>
            <th scope="row">${doc.data().date}</th>
            <td>${doc.data().title}</td>
            <td><a href="${doc.data().website}" Target="_blank">Sitio Web</a></td>
            <td><a href="${doc.data().repository}" Target="_blank">Ver codigo</a></td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            </tr>`
    });
});

/**ELIMINA DOCUMENTO */
function eliminar(id) {
    db.collection("practicas").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}