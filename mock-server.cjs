const express = require("express");
const cors = require("cors");
const app = express();

// you guessed it, it's for cors
app.use(cors());

const mockOrganizations = [
  {
    id: 1,
    name: "Mock Organization 1",
    streetAddress: "123 Main St",
    state: "CA",
    zipcode: "90210",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 1",
    needs: [1, 2, 3],
  },
  {
    id: 2,
    name: "Mock Organization 2",
    streetAddress: "456 Elm St",
    state: "NY",
    zipcode: "10001",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 2",
    needs: [4, 5, 6],
  },
  {
    id: 3,
    name: "Mock Organization 3",
    streetAddress: "789 Oak St",
    state: "TX",
    zipcode: "75001",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 3",
    needs: [7, 1, 5],
  },
  {
    id: 4,
    name: "Mock Organization 4",
    streetAddress: "321 Pine St",
    state: "CA",
    zipcode: "90210",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 4",
    needs: [1, 2, 3],
  },
  {
    id: 5,
    name: "Mock Organization 5",
    streetAddress: "654 Cedar St",
    state: "NY",
    zipcode: "10001",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 5",
    needs: [4, 5, 6],
  },
  {
    id: 6,
    name: "Mock Organization 6",
    streetAddress: "987 Maple St",
    state: "TX",
    zipcode: "75001",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 6",
    needs: [7, 6, 2],
  },
  {
    id: 7,
    name: "Mock Organization 7",
    streetAddress: "741 Oak St",
    state: "CA",
    zipcode: "90210",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 7",
    needs: [1, 2, 3],
  },
  {
    id: 8,
    name: "Mock Organization 8",
    streetAddress: "852 Pine St",
    state: "NY",
    zipcode: "10001",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 8",
    needs: [4, 5, 6],
  },
  {
    id: 9,
    name: "Mock Organization 9",
    streetAddress: "963 Cedar St",
    state: "TX",
    zipcode: "75001",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 9",
    needs: [7, 3, 4],
  },
  {
    id: 10,
    name: "Mock Organization 10",
    streetAddress: "159 Maple St",
    state: "CA",
    zipcode: "90210",
    phoneNumber: "555-555-5555",
    description: "This is a mock organization 10",
    needs: [1, 2, 3],
  },
];

const needs = [
  { name: "Housing", id: 1 },
  { name: "Opiate Addiction", id: 2 },
  { name: "Job Training", id: 3 },
  { name: "Alcohol Addiction", id: 4 },
  { name: "Occupational Therapy", id: 5 },
  { name: "Speech Therapy", id: 6 },
  { name: "Medical Services", id: 7 },
];

const getRandomNeed = () => {
  return needs[Math.floor(Math.random() * needs.length)].id;
};

const getMockActivities = () => {
  const randomStatus = () => {
    return ["IN_PROGRESS", "COMPLETED"][Math.floor(Math.random() * 2)];
  };

  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    organizationId: i + 1,
    beneficiaryId: i + 1,
    needId: getRandomNeed(),
    startDate: new Date(),
    endDate: new Date(),
    status: randomStatus(),
    comments: `This is comment ${i + 1}`,
  }));
};

const generateBeneficiaries = () => {
  const beneficiaries = [];

  for (let i = 0; i < 20; i++) {
    beneficiaries.push({
      id: i + 1,
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      dateOfBirth: new Date(1990 + i, 0, 1),
      identity: `ID${i + 1}`,
      phoneNumber: `555-555-${i + 1}`,
      cabinNumber: i + 1,
      needs: [getRandomNeed()],
      comments: `Comments for beneficiary ${i + 1}`,
    });
  }

  return beneficiaries;
};

// mock endpoints

app.listen("8080", () => {
  console.log("App started up!");
});

app.get("/beneficiaries", (req, res) => {
  var response = generateBeneficiaries();
  res.send(response);
});

app.get("/needs", (req, res) => {
  var response = needs;
  res.send(response);
});

app.get("/organizations", (req, res) => {
  var response = mockOrganizations;
  res.send(response);
});

app.get("/activities", (req, res) => {
  var response = getMockActivities();
  res.send(response);
});
