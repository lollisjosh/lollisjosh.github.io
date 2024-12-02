/* 
  File: script.js
  Description: This class encapsulates a standard login form with fields for
    username, password, favorite fruit, programming languages, and gender.
  Author: Josh Lollis
  Date: 11/2/24
  Course: CPSC-349 HW-2
*/

// LoginForm class for a standard login form
class LoginForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.username = this.form.username;
        this.password = this.form.password;
        this.gender = this.form.gender;
        this.programmingLanguages = this.form.programming;
        this.fruit = this.form.fruit;
        this.comments = this.form.comments;

        this.bindEvents(); // Initialize event bindings
    }

    static class_description() {
        return "Encapsulates a standard login form with username, password, " +
            "fruit, programming languages, and gender.";
    }

    bindEvents() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default submit
            this.handleSubmit(); // Handle submit
        });
    }

    handleSubmit() {
        const formData = this.getFormData(); // Gather data
        console.log('Form Data Submitted:', formData); // Log form data
        console.log("username:", this.username.value);
        console.log("password:", this.password.value);
        console.log("gender:", this.gender.value);
        console.log("programming:", this.programmingLanguages.value);
        console.log("fruit:", this.fruit.value);
        console.log("comments:", this.comments.value);
    }

    getFormData() {
        return {
            username: this.username.value,
            password: this.password.value,
            gender: this.getSelectedGender(),
            programming: this.getSelectedProgrammingLanguages(),
            fruit: this.fruit.value,
            comments: this.comments.value,
        };
    }

    getSelectedGender() {
        return Array.from(this.gender).find(radio => radio.checked)?.value || ''; // Get selected gender
    }

    getSelectedProgrammingLanguages() {
        return Array.from(this.programmingLanguages) // Get selected languages
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
    }
}

// Instantiate LoginForm on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm('loginForm'); // Create LoginForm instance
});
