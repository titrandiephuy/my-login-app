import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(public oktaAuth: OktaAuthService) {}

  ngOnInit(): void {
    this.oktaAuth.$isAuthenticated.subscribe(val => this.isAuthenticated = val);
  }

  username: string = '';
  fullname: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  checkPassword() {
    // Check if username, fullname, and password are empty
    if (!this.username || !this.fullname || !this.password) {
      this.errorMessage = "Please fill in all fields.";
      this.successMessage = '';
      return;
    }
    if (this.username.length < 5 || this.fullname.length < 5) {
      this.errorMessage = "Username or Full name must be at least 5 characters.";
      this.successMessage = '';
      return;
    }

    // Check if the password meets the policy requirements
    const errors = this.checkPasswordPolicy(this.password, this.username, this.fullname);

    // Validate password
    if (errors.length > 0) {
      this.errorMessage = errors.join("<br>");
      this.successMessage = '';
      return;
    }

    // Password meets the policy requirements
    this.errorMessage = '';
    this.successMessage = "Password meets the policy requirements.";
    this.oktaAuth.login('/')
  }
  checkPasswordPolicy(password: string, accountName: string, fullName: string): string[] {
    var errors: string[] = [];

    // Check password length
    if (password.length < 8) {
      errors.push("- Password must be at least 8 characters long.");
    }

    // Check if the password contains the account name or parts of the full name
    var lowerCasePassword = password.toLowerCase();
    var lowerCaseAccountName = accountName.toLowerCase();
    var lowerCaseFullName = fullName?.toLowerCase() ?? '';

    if (lowerCasePassword.indexOf(lowerCaseAccountName) > -1) {
      errors.push("- Password cannot contain the username.");
    }

    var partsOfThreeLettersFullName = [
      ...(lowerCaseFullName.match(/.{3}/g) || []),
      ...(lowerCaseFullName.substr(1).match(/.{3}/g) || []),
      ...(lowerCaseFullName.substr(2).match(/.{3}/g) || [])
    ];

    var checkFullName = new RegExp(partsOfThreeLettersFullName.join("|"), "i").test(lowerCasePassword);

    if (checkFullName) {
      errors.push("- Password cannot contain parts of the full name.");
    }

    // Check if the password contains characters from at least three of the four categories (uppercase, lowercase, digits, non-alphabetic)
    var categoryCount = 0;
    var categoryRegex = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];

    for (var j = 0; j < categoryRegex.length; j++) {
      if (categoryRegex[j].test(password)) {
        categoryCount++;
      }
    }

    if (categoryCount < 3) {
      errors.push("- Password must contain characters from at least three of the four categories (uppercase, lowercase, digits, non-alphabetic).");
    }

    // Check if the password coincides with any of the last 5 passwords
    var lastPasswords = ["daylamatkhau@123", "testmatkhautrung@5435345", "hehehehe@88", "password4", "password5"];
    if (lastPasswords.includes(password)) {
      errors.push("- Password cannot be coincident with any of the last 5 passwords.");
    }

    return errors;
  }

}
