// Exporting reusable test data for authentication-related test cases
module.exports = {

  // A valid email address used for positive test scenarios
  // Example: login should succeed with this email
  validEmail: "d@scos.com",

  // An invalid email format used for negative test scenarios
  // Example: system should show validation error
  invalidEmail: "abc@",

  // A strong valid password (meets typical security rules)
  // Example: login/signup should accept this password
  validPassword: "Admin@123",

  // An invalid/weak password (too short, does not meet criteria)
  // Example: system should reject this password
  invalidPassword: "12"
};