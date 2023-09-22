import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Beneficiary } from "../../client/src";
import { Link } from "react-router-dom";
import { useNeedList } from "../../data";

interface TableProps {
  data: Required<Beneficiary>[];
}

export const ageRanges = [
  { label: "0-9", value: "0-9", min: 0, max: 9 },
  { label: "10-19", value: "10-19", min: 10, max: 19 },
  { label: "20-29", value: "20-29", min: 20, max: 29 },
  { label: "30-39", value: "30-39", min: 30, max: 39 },
  { label: "40-49", value: "40-49", min: 40, max: 49 },
  { label: "50-59", value: "50-59", min: 50, max: 59 },
  { label: "60-69", value: "60-69", min: 60, max: 69 },
  { label: "70+", value: "70+", min: 70, max: 1000 },
];

export function getAge(birthDate: Date): number {
  const today = new Date();
  if (!birthDate) {
    debugger;
  }
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export const BeneficiariesTable: React.FC<TableProps> = ({ data }) => {
  const [filter, setFilter] = useState({
    ageRange: [-Infinity, Infinity],
    age: "",
    name: "",
    sex: "",
    needs: [],
  });
  const { data: needs = [] } = useNeedList();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const needsMap = new Map(needs.map((need) => [need.name, need.id]));

  const filteredData = data.filter((person) => {
    const age = getAge(person.dateOfBirth);
    return (
      (filter.age === "" ||
        (age >= filter.ageRange[0] && age <= filter.ageRange[1])) &&
      (filter.name === "" ||
        person.firstName.toLowerCase().includes(filter.name.toLowerCase()) ||
        person.lastName.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.sex === "" ||
        person.identity.toLowerCase().includes(filter.sex.toLowerCase())) &&
      (filter.needs.length === 0 ||
        person.needs.some((needId) =>
          filter.needs.some((need) => needsMap.get(need) === `${needId}`)
        ))
    );
  });

  const sexes = [...new Set(data.map((d) => d.identity))];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "flex-start",
        }}
      >
        <FormControl
          variant="outlined"
          style={{ backgroundColor: "white", width: 100 }}
        >
          <InputLabel htmlFor="min-age-select">Age</InputLabel>
          <Select
            value={filter.age}
            onChange={(e) => {
              const age = e.target.value;
              const [start, end] = age
                .replace("+", "-1000")
                .split("-")
                .map((a) => parseInt(a, 10));
              setFilter({
                ...filter,
                age: e.target.value,
                ageRange: [start, end],
              });
            }}
            label="Age"
            inputProps={{
              name: "age",
              id: "age-select",
            }}
            sx={{
              "& input": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <MenuItem value={""}>Any</MenuItem>
            {ageRanges.map((age) => (
              <MenuItem key={age.label} value={age.value}>
                {age.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          style={{ backgroundColor: "white", width: 100 }}
        >
          <InputLabel htmlFor="sex-select">Sex</InputLabel>
          <Select
            value={filter.sex}
            onChange={(e) => {
              const { name, value } = e.target;
              setFilter({ ...filter, [name]: value });
            }}
            label="Sex"
            inputProps={{
              name: "sex",
              id: "sex-select",
            }}
            sx={{
              "& input": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <MenuItem value={""}>Any</MenuItem>
            {sexes.map((sex) => (
              <MenuItem key={sex} value={sex}>
                {sex}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          style={{ backgroundColor: "white", width: 300 }}
        >
          <InputLabel htmlFor="sex-select">Needs</InputLabel>
          <Select
            multiple
            value={filter.needs}
            onChange={(e) => {
              const { name, value } = e.target as {
                name: string;
                value: string[];
              };
              setFilter({ ...filter, [name]: value.includes("") ? [] : value });
            }}
            label="Needs"
            inputProps={{
              name: "needs",
              id: "needs-select",
            }}
            sx={{
              "& input": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <MenuItem value={""}>Any</MenuItem>
            {needs.map((need) => (
              <MenuItem key={need.name} value={need.name}>
                {need.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Name"
          name="name"
          value={filter.name}
          onChange={handleFilterChange}
          variant="outlined"
          margin="normal"
          sx={{
            "& input": {
              backgroundColor: "white",
              color: "black",
            },
            marginLeft: "auto",
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Identity</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Cabin Number</TableCell>
              <TableCell>Needs</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((beneficiary) => (
              <TableRow key={beneficiary.id}>
                <TableCell>
                  <Link to={`/beneficiaries/${beneficiary.id}/info`}>
                    {beneficiary.firstName} {beneficiary.lastName}
                  </Link>
                </TableCell>
                <TableCell>{`${new Date(
                  beneficiary.dateOfBirth
                ).toLocaleDateString()} (${getAge(
                  beneficiary.dateOfBirth
                )})`}</TableCell>
                <TableCell>{beneficiary.identity}</TableCell>
                <TableCell>{beneficiary.phoneNumber}</TableCell>
                <TableCell>{beneficiary.cabinNumber}</TableCell>
                <TableCell>
                  {beneficiary.needs.filter(Boolean).map((needId) => (
                    <Chip key={needId} label={needId} sx={{ marginRight: 1 }} />
                  ))}
                </TableCell>
                <TableCell>{beneficiary.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
