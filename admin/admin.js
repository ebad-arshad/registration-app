let count = 1;
let data = JSON.parse(localStorage.getItem("data"));
window.onload = () => {
    localStorage.removeItem("is_login")
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
    localStorage.setItem("is_login", "yes")
    location = "../index.html";
}

let is_login = localStorage.getItem("is_login");
if (is_login) {
    document.getElementsByClassName("admin_login")[0].classList.add("hidden");
    document.getElementsByClassName("table_box")[0].classList.remove("hidden");
} else {
    document.getElementsByClassName("admin_login")[0].classList.remove("hidden");
    document.getElementsByClassName("table_box")[0].classList.add("hidden");
}

const login_btn = () => {
    let user_id = document.getElementById("user_id");
    let user_password = document.getElementById("user_password");
    if (user_id.value === "admin" && user_password.value === "admin12345") {
        document.getElementsByClassName("admin_login")[0].classList.add("hidden");
        document.getElementsByClassName("table_box")[0].classList.remove("hidden");
    }
    else {
        user_id.style.borderColor = "red";
        user_password.style.borderColor = "red";
        document.getElementsByClassName("invalid_id_pass")[0].style.visibility = "visible";
        setTimeout(() => {
            document.getElementsByClassName("invalid_id_pass")[0].style.visibility = "hidden";
            user_id.style.borderColor = "#4835d4";
            user_password.style.borderColor = "#4835d4";
        }, 2000);
    }
}