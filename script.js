"use script";
window.addEventListener("DOMContentLoaded", load);

let students = {};
let firstName = [];
let middleName = [];
let nickname = [];
let lastName = [];
let photo = [];
let house = [];

function load() {
    console.log("load");
    fetch('http://petlatkea.dk/2021/hogwarts/students.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        cleanStudentsData(data);
    })
    .catch(function (err) {
        console.log(err);
    });
}

function cleanStudentsData(data) {
    console.log("start");
    for (let i = 0; i < data.length; i++) {
        let fullName = data[i].fullname.trimStart().trimEnd().split(' ');
        firstName[i] = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1).toLowerCase();
        if (fullName[1] != undefined) {
            if (fullName[2] != undefined) {
                if (fullName[1].charAt(0) === '"') {
                    fullName[1] = fullName[1].replace(/['"]+/g, '');
                    nickname[i] = fullName[1].charAt(0).toUpperCase() + fullName[1].slice(1).toLowerCase();
                }else {
                    middleName[i] = fullName[1].charAt(0).toUpperCase() + fullName[1].slice(1).toLowerCase();
                }
                lastName[i] = fullName[2].charAt(0).toUpperCase() + fullName[2].slice(1).toLowerCase();
            }else {
                lastName[i] = fullName[1].charAt(0).toUpperCase() + fullName[1].slice(1).toLowerCase();
            }
        }
        house[i] = data[i].house.trimStart().charAt(0).toUpperCase() + data[i].house.trimStart().slice(1).toLowerCase();
    }

    var duplicates = lastName.filter(function(item,index){
        return lastName.indexOf(item) != index;
    });
    for (let i = 0; i < data.length; i++) {
        if (lastName[i] != undefined) {
            if (duplicates.includes(lastName[i])) {
                photo[i] = 'image/' + lastName[i].toLowerCase() + '_' + firstName[i].toLowerCase();
            }else {
                photo[i] = 'image/' + lastName[i].toLowerCase() + '_' + firstName[i].charAt(0).toLowerCase();
            }
        }
    }

    students = data.map(function(fullname, i) {
        return {
            firstName: firstName[i],
            middleName: middleName[i],
            nickname: nickname[i],
            lastName: lastName[i], 
            photo: photo[i],
            house: house[i]
        }
    });
    console.table(students);
}
