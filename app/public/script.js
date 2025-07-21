// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log(event);
//     console.log('DOM fully loaded and parsed');
//     const studentForm1 = document.getElementById('student-form');
//     console.log(studentForm1);
// });

const studentForm = document.getElementById('student-form');

console.log(studentForm);

studentForm.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const marks = document.getElementById('marks').value;
        if (!name || !age || !marks) {
            alert('Please fill all the fields');
            return;
        }
        const student = {
            name,
            age,
            marks,
        };
        addStudent(student);
        studentForm.reset();
        document.getElementById('name').focus();
    }
});

const addStudent = (student) => {
    let table = document.getElementById('student-table');
    if (!table) {
        table = document.createElement('table');
        table.id = 'student-table';
        table.innerHTML = `
            ${getTableHeading()}
            <tbody id="student-table-body">
                ${getTableRow(student)}
            </tbody>
        `;
        document.body.appendChild(table);
    } else {
        const tableBody = document.getElementById('student-table-body');
        tableBody.innerHTML += getTableRow(student);
    }
};

const getTableHeading = () => {
    return `
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Marks</th>
                <th colspan="2">Actions</th>
            </tr>
        </thead>
    `;
};

const getTableRow = (student) => {
    return `
        <tr class="student-row" id="student-row">
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.marks}</td>
            <td>
                <button
                    class="edit"
                    id="edit-btn"
                    onclick="editStudent(this)"
                >
                    Edit
                </button>
            </td>
            <td>
                <button
                    class="delete"
                    id="delete-btn"
                    onclick="deleteStudent(this)"
                >
                    Delete
                </button>
            </td>
        </tr>
    `;
};

const editStudent = (btn) => {
    const studentRow = btn.parentElement.parentElement;
    const student = {
        name: studentRow.children[0].textContent,
        age: studentRow.children[1].textContent,
        marks: studentRow.children[2].textContent,
    };
    studentRow.innerHTML = getEditTableRow(student);
};

const getEditTableRow = (student) => {
    return `
        <tr class="student-row" id="student-row">
            <td>
                <input type="text" id="name" value="${student.name}">
            </td>
            <td>
                <input type="text" id="age" value="${student.age}">
            </td>
            <td>
                <input type="text" id="marks" value="${student.marks}">
            </td>
            <td colspan="2">
                <button
                    class="save"
                    id="save-btn"
                    onclick="saveStudent(this)"
                >
                    Save
                </button>
            </td>
        </tr>
    `;
};

const saveStudent = (btn) => {
    const studentRow = btn.parentElement.parentElement;
    const student = {
        name: studentRow.children[0].children[0].value,
        age: studentRow.children[1].children[0].value,
        marks: studentRow.children[2].children[0].value,
    };
    studentRow.innerHTML = getTableRow(student);
};

const deleteStudent = (btn) => {
    const tableBody = document.getElementById('student-table-body');
    tableBody.removeChild(btn.parentElement.parentElement);
    const studentRow = document.getElementById('student-row');
    if (!studentRow) {
        const table = document.getElementById('student-table');
        table.remove();
    }
};
