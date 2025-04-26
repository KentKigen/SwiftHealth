class Client {
  constructor(name, age, gender, contactInfo, clientId, programs = []) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.contactInfo = contactInfo;
    this.clientId = clientId;
    this.programs = programs;
    this.createdAt = new Date();
  }
}

module.exports = Client;
