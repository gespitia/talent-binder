const faker = require('faker');

const positions = ["Desarrollador Frontend", "Desarrollador Backend", "Analista de Sistemas", "Ingeniero de Software"];
const departments = ["Desarrollo", "IT", "Soporte", "Administración"];
const civilStatuses = ["Soltero", "Casado", "Divorciado", "Viudo"];
const sexes = ["Masculino", "Femenino"];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEmployee(id) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const position = positions[getRandomInt(0, positions.length - 1)];
    const dateOfBirth = faker.date.between('1964-01-01', '2004-12-31').toISOString().split('T')[0];
    const hireOfDate = faker.date.between('2014-01-01', '2024-12-31').toISOString().split('T')[0];
    const salary = getRandomInt(3500000, 6000000);
    const department = departments[getRandomInt(0, departments.length - 1)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@empresa.com`;
    const phoneNumber = faker.phone.phoneNumber();
    const address = faker.address.streetAddress() + " " + faker.address.city();
    const identificationType = "CC";
    const identificationNumber = faker.random.number({min: 100000000, max: 999999999});
    const civilStatus = civilStatuses[getRandomInt(0, civilStatuses.length - 1)];
    const children = faker.random.boolean();
    const numberOfChildren = children ? getRandomInt(1, 4) : 0;
    const sex = sexes[getRandomInt(0, sexes.length - 1)];

    return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        position: position,
        dateOfBirth: dateOfBirth,
        hireOfDate: hireOfDate,
        salary: salary,
        department: department,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        identificationType: identificationType,
        identificationNumber: identificationNumber,
        civilStatus: civilStatus,
        children: children,
        numberOfChildren: numberOfChildren,
        sex: sex
    };
}

const employees = [];
for (let i = 1; i <= 1000; i++) {
    employees.push(generateEmployee(i));
}

// const data = JSON.stringify({ employees: employees }, null, 0);
// console.log(data);

module.exports = () => {
    return { employees };
}
