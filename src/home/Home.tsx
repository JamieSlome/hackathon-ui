import { Beneficiary } from "../client/src";
import { HomeTable } from "./Table";

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01T00:00:00Z",
    identity: "M",
    phoneNumber: "123-456-7890",
    cabinNumber: 1,
    needs: [
      { id: 1, name: "Food" },
      { id: 2, name: "Water" },
    ],
    comments: "No comments",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    dateOfBirth: "1995-01-01T00:00:00Z",
    identity: "F",
    phoneNumber: "123-456-7890",
    cabinNumber: 2,
    needs: [
      { id: 1, name: "Food" },
      { id: 3, name: "Shelter" },
    ],
    comments: "No comments",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Smith",
    dateOfBirth: "1985-01-01T00:00:00Z",
    identity: "M",
    phoneNumber: "123-456-7890",
    cabinNumber: 3,
    needs: [
      { id: 2, name: "Water" },
      { id: 4, name: "Clothing" },
    ],
    comments: "No comments",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Johnson",
    dateOfBirth: "1975-01-01T00:00:00Z",
    identity: "F",
    phoneNumber: "123-456-7890",
    cabinNumber: 4,
    needs: [
      { id: 3, name: "Shelter" },
      { id: 5, name: "Medical care" },
    ],
    comments: "No comments",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Lee",
    dateOfBirth: "1965-01-01T00:00:00Z",
    identity: "M",
    phoneNumber: "123-456-7890",
    cabinNumber: 5,
    needs: [
      { id: 4, name: "Clothing" },
      { id: 6, name: "Transportation" },
    ],
    comments: "No comments",
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Chen",
    dateOfBirth: "1955-01-01T00:00:00Z",
    identity: "F",
    phoneNumber: "123-456-7890",
    cabinNumber: 6,
    needs: [
      { id: 5, name: "Medical care" },
      { id: 7, name: "Education" },
    ],
    comments: "No comments",
  },
  {
    id: 7,
    firstName: "Michael",
    lastName: "Wang",
    dateOfBirth: "1945-01-01T00:00:00Z",
    identity: "M",
    phoneNumber: "123-456-7890",
    cabinNumber: 7,
    needs: [
      { id: 6, name: "Transportation" },
      { id: 8, name: "Legal assistance" },
    ],
    comments: "No comments",
  },
  {
    id: 8,
    firstName: "Olivia",
    lastName: "Zhang",
    dateOfBirth: "1935-01-01T00:00:00Z",
    identity: "F",
    phoneNumber: "123-456-7890",
    cabinNumber: 8,
    needs: [
      { id: 7, name: "Education" },
      { id: 9, name: "Financial assistance" },
    ],
    comments: "No comments",
  },
  {
    id: 9,
    firstName: "William",
    lastName: "Liu",
    dateOfBirth: "1925-01-01T00:00:00Z",
    identity: "M",
    phoneNumber: "123-456-7890",
    cabinNumber: 9,
    needs: [
      { id: 8, name: "Legal assistance" },
      { id: 10, name: "Housing" },
    ],
    comments: "No comments",
  },
  {
    id: 10,
    firstName: "Sophia",
    lastName: "Zhao",
    dateOfBirth: "1915-01-01T00:00:00Z",
    identity: "F",
    phoneNumber: "123-456-7890",
    cabinNumber: 10,
    needs: [
      { id: 9, name: "Financial assistance" },
      { id: 1, name: "Food" },
    ],
    comments: "No comments",
  },
].map((b) => ({
  ...b,
  dateOfBirth: new Date(b.dateOfBirth),
})) as Required<Beneficiary>[];

export const Home = () => {
  return <HomeTable data={users} />;
};
