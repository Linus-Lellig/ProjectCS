"use strict";
function getUsersList() {
    //debugger
    console.log("Invoked getUsersList()");     //console.log for debugging client side
    const url = "/users/list/";   //API method on web server will be in Users class
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert
        } else {
            formatUsersList(response);          //this function will create a HTML table of the data (as per previous lesson)
        }
    });
}

function formatUsersList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.UserID + "<td><td>" + item.Name + "<tr><td>";
    }
    document.getElementById("UsersTable").innerHTML = dataHTML;
}
