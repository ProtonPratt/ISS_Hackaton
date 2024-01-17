var submit = document.getElementById("submit-student")

submit.addEventListener("click", function () {
    var result_dict = {}
    var name = document.getElementById("full-name").value
    var email = document.getElementById("email").value
    var roll_no = document.getElementById("roll-no").value
    var phone = document.getElementById("phone-number").value
    var degree = document.getElementById("degree").value
    var branch = document.getElementById("branch").value

    const genderRadioButtons = document.getElementsByName('gender');
    let selectedGender;
    for (let i = 0; i < genderRadioButtons.length; i++) {
        if (genderRadioButtons[i].checked) {
            selectedGender = genderRadioButtons[i].value;
            break;
        }
    }
    console.log(selectedGender);

    result_dict["name"] = name
    result_dict["email"] = email
    result_dict["roll_no"] = roll_no
    result_dict["phone"] = phone
    result_dict["degree"] = degree
    result_dict["gender"] = selectedGender
    result_dict["branch"] = branch
    // result_dict["gender"] = gender

    console.log(result_dict)
    fetch('http://127.0.0.1:5000/app/student-entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result_dict),
    })
        .then(response => response.json())
        .then(data => {
            // console.log('Success:', data);
            alert("Form submitted successfully")
        }
        )
        .catch((error) => {
            console.error('Error:', error);
        }
        );

});

