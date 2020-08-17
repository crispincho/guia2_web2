let data;
const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'data/students.json', true);
xhttp.send();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        getData();
    }
}

function getData() {
    document.getElementById("rows").innerHTML = "";
    data.students.forEach(element => {
        console.log(element);
        renderRows(element);
    });
}

function renderRows(data) {
    let notesSummary = 0;
    data.notes.forEach(element => {
        notesSummary += element;
    });
    notesSummary /= data.notes.length;
    const html = `<tr>
    <td>${data.code}</td>
    <td>${data.name}</td>
    <td>${data.lastName}</td>
    <td>${notesSummary}</td>
    <td>${data.age}</td>
    <td><button class="btn btn-danger" onclick="deleteRow(${data.code})">Eliminar</button></td>
</tr>`;
    document.getElementById("rows").innerHTML += html;
}

const addRow = () => {
    const code = document.getElementById("txtCode");
    const name = document.getElementById("txtName");
    const lastName = document.getElementById("txtLastName");
    const notesText = document.getElementById("txtNotes");
    const age = document.getElementById("txtAge");
    const notes = [];
    let number = "";
    for (let index = 0; index < notesText.value.length; index++) {
        if (notesText.value.charAt(index) == ',' || notesText.value.charAt(index) == '-') {
            notes.push(parseFloat(number));
            number = "";
        } else if (index == (notesText.value.length - 1)) {
            number += notesText.value.charAt(index);
            notes.push(parseFloat(number));
        } else {
            number += notesText.value.charAt(index);
        }
    }

    if (code.value == null || code.value == "" || name.value == null || name.value == "" || lastName.value == null || lastName.value == "" || notes.length == 0 || age.value == null || age.value == "") {
        alert("Por favor llene todos los campos");
    } else {
        const student = {
            code: code.value,
            name: name.value,
            lastName: lastName.value,
            notes: notes,
            age: age.value
        };
        code.text = "";
        data.students.push(student);
        getData();
    }
}

const deleteRow = code => {
    let i = 0
    data.students.forEach(element => {
        if (element.code == code) {
            data.students.splice(i, 1);
            getData();
            return;
        }
        i++;
    });
}
function findByCode() {
    const code = document.getElementById("txtFindCode").value;
    let i = 0;
    let erase = true;
    data.students.forEach(element => {
        if (element.code == code) {
            const student = data.students[i];
            const html = `<br>
            <h5>Code</h5>
            <p>${student.code}</p>
            <br>
            <h5>Nombre</h5>
            <p>${student.name}</p>
            <br>
            <h5>Notas</h5>
            <p>${student.notes}</p>`;
            document.getElementById("studentDetail").innerHTML = html;
            erase = false
        } else if (erase) {
            document.getElementById("studentDetail").innerHTML = "";
        }
        i++;
    });
}