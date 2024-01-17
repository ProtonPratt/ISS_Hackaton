var submit_faculty = document.getElementById("submit-faculty")

submit_faculty.addEventListener("click", function () {
    var result_dict = {}
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone-number").value
    var education = document.getElementById("education").value
    var designation = document.getElementById("designation").value
    var research_area = document.getElementById("research-area").value
    var research_lab = document.getElementById("research-lab").value

    const genderRadioButtons = document.getElementsByName('gender');
    let selectedGender;
    for (let i = 0; i < genderRadioButtons.length; i++) {
        if (genderRadioButtons[i].checked) {
            selectedGender = genderRadioButtons[i].value;
            break;
        }
    }

    result_dict["Name"] = name
    result_dict["Email"] = email
    result_dict["Phone"] = phone
    result_dict["Education"] = education
    result_dict["Designation"] = designation
    result_dict["Research_Area"] = research_area
    result_dict["Research_Lab"] = research_lab
    result_dict["Gender"] = selectedGender

    console.log(result_dict)

    fetch('http://127.0.0.1:5000/app/faculty-entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result_dict),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Form submitted successfully")
        }
        )
        .catch((error) => {
            console.error('Error:', error);
        }
        );


});


