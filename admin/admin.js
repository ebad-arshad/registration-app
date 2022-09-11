let count = 1;
let data = JSON.parse(localStorage.getItem("data"));
window.onload = () => {
    for (let key in data) {
        document.getElementById("table").innerHTML += `
        <tr id="${key}">
            <td>
                <i onclick="del_btn()" class="fa-solid fa-trash"></i>
                <i onclick="edit_btn()" class="fa-solid fa-pen-to-square"></i>
            </td>
            <td>${count}</td>
            <td>${data[key].firstName}</td>
            <td class="email">${data[key].email}</td>
            <td>${data[key].date_of_birth}</td>
            <td>${data[key].gender}</td>
            <td>${data[key].city}</td>
            <td>${data[key].address}</td>
            <td>${data[key].phone_number}</td>
            <td>${data[key].cnic}</td>
        </tr>
    `
        count++;
    }
}

const del_btn = () => {
    let getting_id = event.target.parentNode.parentNode.id;
    let new_count = 1;
    for (let key in data) {
        if (getting_id === key) {
            delete data[key];
            localStorage.setItem("data", JSON.stringify(data))
        }
    }
    document.getElementById("table").innerHTML = `
    <tr>
        <th>Del / Edit</th>
        <th>S No.</th>
        <th>Name</th>
        <th class="email">Email</th>
        <th>DOB</th>
        <th>Gender</th>
        <th>City</th>
        <th>Address</th>
        <th>Phone No.</th>
        <th>CNIC No.</th>
    </tr>
    `
    for (let key in data) {
        document.getElementById("table").innerHTML += `
        <tr id="${key}">
            <td>
                <i onclick="del_btn()" class="fa-solid fa-trash"></i>
                <i onclick="edit_btn()" class="fa-solid fa-pen-to-square"></i>
            </td>
            <td>${new_count}</td>
            <td>${data[key].firstName}</td>
            <td class="email">${data[key].email}</td>
            <td>${data[key].date_of_birth}</td>
            <td>${data[key].gender}</td>
            <td>${data[key].city}</td>
            <td>${data[key].address}</td>
            <td>${data[key].phone_number}</td>
            <td>${data[key].cnic}</td>
        </tr>
    `
        new_count++;
    }
}
const edit_btn = () => {
    let getting_id = event.target.parentNode.parentNode.id;
    for (let key in data) {
        if (getting_id === key) {
            data[key].id = getting_id;
            localStorage.setItem("editable_data", JSON.stringify(data[key]));
        }
    }
    location = "../index.html"; 
}