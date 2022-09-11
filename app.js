var reg_name = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
var reg_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var reg_address = /[\S\s]+[\S]+/;
var reg_emptydate = /^[0-9.+-. ']+$/;
var reg_number = /^03\d{9}$/;
var reg_cnic = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
var arr = [reg_name, reg_name, reg_emptydate, reg_email, reg_address, reg_number, reg_cnic];
var getting_all_inputs = document.getElementsByClassName("check");
var getting_all_select = document.getElementsByClassName("select");
var obj;
var check_empty = document.getElementsByClassName("input_for_gi");
var pic_src;
var edit_data = JSON.parse(localStorage.getItem("editable_data"));

if (edit_data) {
    document.getElementById("f_name").value = edit_data.firstName
    document.getElementById("l_name").value = edit_data.lastName
    document.getElementById("date_of_birth").value = edit_data.date_of_birth
    var gender_arr = ["", "male", "female", "other"]
    for (var l = 1; l < 4; l++) {
        if (gender_arr[l] === edit_data.gender) {
            document.getElementById("gender").children[l].setAttribute("selected", "selected")
        }
    }
    document.getElementById("email").value = edit_data.email
    document.getElementById("address").value = edit_data.address
    var city_arr = ["", "Karachi", "Islamabad", "Lahore", "Multan", "Peshawar", "Sukkur", "Larkana", "Quetta"]
    for (var m = 1; m < 9; m++) {
        if (city_arr[m] === edit_data.city) {
            document.getElementById("city").children[m].setAttribute("selected", "selected")
        }
    }
    document.getElementById("phone_number").value = edit_data.phone_number
    document.getElementById("cnic_number").value = edit_data.cnic
}

window.onkeydown = function () {
    if (event.keyCode == 13) {
        form_check();
    }
}

function form_check() {
    var f_name = document.getElementById("f_name").value;
    var l_name = document.getElementById("l_name").value;
    var dob = document.getElementById("date_of_birth").value;
    var gender_arr = ["", "male", "female", "other"]
    var gender = gender_arr[document.getElementById("gender").selectedIndex];
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var city_arr = ["", "Karachi", "Islamabad", "Lahore", "Multan", "Peshawar", "Sukkur", "Larkana", "Quetta"]
    var city = city_arr[document.getElementById("city").selectedIndex];
    var phone = document.getElementById("phone_number").value;
    var cnic = document.getElementById("cnic_number").value;
    var flag = 0;
    var count = 0;
    var color_changing_arr = [];
    var color_changing_arr2 = [];

    for (var i = 0; i < getting_all_inputs.length; i++) {
        if (!arr[i].test(getting_all_inputs[i].value)) {
            color_changing_arr2.push(i)
            getting_all_inputs[i].style.borderColor = "red";
            if (count === 0) {
                getting_all_inputs[i].focus()
            }
            count++;
        }
        else {
            flag++;
            getting_all_inputs[i].style.borderColor = "rgb(204, 204, 204)"
        }
        for (var j = 0; j < 2; j++) {
            if (getting_all_select[j].selectedIndex === 0) {
                color_changing_arr.push(j)
                getting_all_select[j].style.borderColor = "red";
            }
            else {
                flag++;
                getting_all_select[j].style.borderColor = "rgb(204, 204, 204)";
            }
        }
    }
    for (let l = 0; l < color_changing_arr.length; l++) {
        setTimeout(() => {
            if (color_changing_arr[0] === 0) {
                getting_all_select[color_changing_arr[l]].style.borderColor = "rgb(204, 204, 204)";
            } else {
                getting_all_select[color_changing_arr[l]].style.borderColor = "#fff";
            }
        }, 2000)
    }
    for (let m = 0; m < color_changing_arr2.length; m++) {
        setTimeout(() => {
            if (getting_all_inputs[0].attributes[0].value === "0" || getting_all_inputs[0].attributes[0].value === "1" || getting_all_inputs[0].attributes[0].value === "2" || getting_all_inputs[1].attributes[0].value === "0" || getting_all_inputs[1].attributes[0].value === "1" || getting_all_inputs[1].attributes[0].value === "2" || getting_all_inputs[2].attributes[0].value === "0" || getting_all_inputs[2].attributes[0].value === "1" || getting_all_inputs[2].attributes[0].value === "2") {
                getting_all_inputs[color_changing_arr2[m]].style.borderColor = "rgb(204, 204, 204)";
            } else {
                getting_all_inputs[color_changing_arr2[m]].style.borderColor = "#fff";
            }
        }, 2000)
    }
    if (!edit_data) {
        if (document.getElementById("upload_file").files.length === 1) {
            flag++;
            document.getElementById("label_for_file_upload").style.borderColor = "#4835d4";
        }
        else {
            setTimeout(() => {
                document.getElementById("label_for_file_upload").style.borderColor = "rgb(204, 204, 204)";
            }, 2000)
            document.getElementById("label_for_file_upload").style.borderColor = "red";
        }
    } else {
        flag++;
    }
    var item_check = localStorage.getItem("data");
    if (!item_check) {
        obj = {};
    } else {
        obj = JSON.parse(item_check);
    }
    if (flag === 22) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        var random_char_arr = [];
        for (var k = 0; k < 5; k++) {
            var random_number = Math.floor(Math.random() * (chars.length));
            random_char_arr.push(chars[random_number])
            if (!isNaN(Number(random_char_arr[0]))) {
                random_char_arr = [];
                k = -1;
            }
        }
        if (edit_data) {
            obj[edit_data.id] = {
                firstName: f_name,
                lastName: l_name,
                date_of_birth: dob,
                gender: gender,
                pic_src: pic_src,
                email: email,
                address: address,
                city: city,
                phone_number: phone,
                cnic: cnic,
            }
            localStorage.setItem("data", JSON.stringify(obj));
            localStorage.removeItem("editable_data");
            location = "admin/admin.html";
        } else {
            obj[random_char_arr.join("")] = {
                firstName: f_name,
                lastName: l_name,
                date_of_birth: dob,
                gender: gender,
                pic_src: pic_src,
                email: email,
                address: address,
                city: city,
                phone_number: phone,
                cnic: cnic,
            }
            localStorage.setItem("data", JSON.stringify(obj));
            window.location.reload();
        }
    }
}

function loading_picture() {
    pic_src = URL.createObjectURL(event.target.files[0]);
    document.getElementsByClassName("image")[0].innerHTML = `<img id="upload_image" src="${pic_src}" alt="">`
}

function changing_background_col1() {
    event.target.style.backgroundColor = "#e8f0fe"
}

function changing_back_background_col1() {
    if (event.target.value === "") {
        event.target.style.backgroundColor = "#fff"
    }
}

function changing_back_background_col2() {
    if (event.target.value === "") {
        event.target.style.backgroundColor = "#4835d4"
    }
}


function changing_background_col2() {
    event.target.style.backgroundColor = "#e8f0fe"
}


function changing_background_col1_select() {
    if (event.target.selectedIndex !== 0) {
        event.target.style.backgroundColor = "#e8f0fe"
    } else {
        event.target.style.backgroundColor = "#fff"
    }
}

function changing_background_col2_select() {
    if (event.target.selectedIndex !== 0) {
        event.target.style.backgroundColor = "#e8f0fe"
        event.target.style.color = "#000"
    } else {
        event.target.style.backgroundColor = "#4835d4"
        event.target.style.color = "rgb(211, 211, 211)"
    }
}






