 document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullname = document.getElementById('personname').value;
    const email = document.getElementById('email').value;
    const shootdate = document.getElementById('shootdate').value;
    const select = document.getElementById('shoottype').value;
    const textarea = document.getElementById('vision').value;
    const checkbox = document.getElementById('terms').checked;
    const radiogroup = document.querySelector('input[name="location"]:checked');
    const phonenumber = document.getElementById('tel').value;

    if (!radiogroup) {
        alert("Pick a location please.");
        return;
    }

    if (!fullname || !email) {
        alert("You need a name and email.");
        return;
    }

    if (!shootdate) {
        alert("Please pick a shoot date.");
        return;
    }

    if (textarea.length < 10) {
        alert("Give a more detailed description of your vision for the shoot please");
        return;
}

    const formData = {
        name: fullname,
        email: email,
        shootdate: shootdate,
        tel: phonenumber,
        location: radiogroup.value,
        terms: checkbox,
        vision: textarea,
        shoottype: select,



    };

    const xhr = new XMLHttpRequest();
    
    xhr.open("GET", "submit.json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const message = document.getElementById('message');
            const response = JSON.parse(xhr.responseText);
            message.textContent = response.message;
            document.getElementById('signup-form').reset();  
        } else if (xhr.readyState === 4) {
            alert('Error submitting form.');
        }
    };
    xhr.send(JSON.stringify(formData));
    alert(`Success: ${fullname}`);
    console.log(formData);
    });