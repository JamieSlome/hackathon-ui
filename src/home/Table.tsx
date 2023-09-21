

import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Beneficiary } from '../client/src';


interface TableProps {
  data: Required<Beneficiary>[];
}

const ageRanges = [
    { label: '0-9', value: '0-9' },
    { label: '10-19', value: '10-19' },
    { label: '20-29', value: '20-29' },
    { label: '30-39', value: '30-39' },
    { label: '40-49', value: '40-49' },
    { label: '50-59', value: '50-59' },
    { label: '60-69', value: '60-69' },
    { label: '70+', value: '70+' },
  ];

  function getAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

export const HomeTable: React.FC<TableProps> = ({ data }) => {
  const [filter, setFilter] = useState({
    ageRange: [-Infinity, Infinity],
    age: '',
    name: '',
    sex: '',
    needs: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredData = data.filter((person) => {
    const age = getAge(person.dateOfBirth)
    return (
      (filter.age === '' || (age >= filter.ageRange[0] && age <= filter.ageRange[1])) &&
      (filter.name === '' || (person.firstName.toLowerCase().includes(filter.name.toLowerCase()) || person.lastName.toLowerCase().includes(filter.name.toLowerCase()))) &&
      (filter.sex === '' || person.identity.toLowerCase().includes(filter.sex.toLowerCase())) &&
      (filter.needs === '' || person.needs.some((need) => need.name.toLowerCase().includes(filter.needs.toLowerCase()))) 
    );
  });

  const sexes = [...new Set(data.map(d => d.identity))]

  return (
    <div style={{ width: 1200 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4, justifyContent: 'flex-start'}}>
      <FormControl variant="outlined"  
        style={{ backgroundColor: 'white', width: 100 }}>
        <InputLabel htmlFor="min-age-select">Age</InputLabel>
        <Select
            value={filter.age}
            onChange={(e) => {
                const age = e.target.value;
                const [start, end] = age.replace("+", "-1000").split("-").map(a => parseInt(a, 10))
                setFilter({...filter, age: e.target.value, ageRange: [start, end]})
            }}
          label="Age"
          inputProps={{
            name: 'age',
            id: 'age-select',
          }}
          sx={{
            '& input': {
              backgroundColor: 'white',
              color: 'black',
            },
          }}
        >
          <MenuItem value={''}>Any</MenuItem>
          {ageRanges.map((age) => (
            <MenuItem key={age.label} value={age.value}>
              {age.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined"  
        style={{ backgroundColor: 'white', width: 100 }}>
        <InputLabel htmlFor="sex-select">Sex</InputLabel>
        <Select
            value={filter.sex}
            onChange={(e) => {
                const { name, value } = e.target;
                setFilter({ ...filter, [name]: value });
              }}
          label="Sex"
          inputProps={{
            name: 'sex',
            id: 'sex-select',
          }}
          sx={{
            '& input': {
              backgroundColor: 'white',
              color: 'black',
            },
          }}
        >
          <MenuItem value={''}>Any</MenuItem>
          {sexes.map((sex) => (
            <MenuItem key={sex} value={sex}>
              {sex}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Needs"
        name="needs"
        value={filter.needs}
        onChange={handleFilterChange}
        variant="outlined"
        margin="normal"
        sx={{
          '& input': {
            backgroundColor: 'white',
            color: 'black',
          },
        }}
      />
      <TextField
        label="Name"
        name="name"
        value={filter.name}
        onChange={handleFilterChange}
        variant="outlined"
        margin="normal"
        sx={{
          '& input': {
            backgroundColor: 'white',
            color: 'black',
          },
          marginLeft: "auto"
        }}
      />
      </Box>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
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
              <TableCell>{beneficiary.id}</TableCell>
              <TableCell>{beneficiary.firstName}</TableCell>
              <TableCell>{beneficiary.lastName}</TableCell>
              <TableCell>{`${new Date(beneficiary.dateOfBirth).toLocaleDateString()} (${getAge(beneficiary.dateOfBirth)})`}</TableCell>
              <TableCell>{beneficiary.identity}</TableCell>
              <TableCell>{beneficiary.phoneNumber}</TableCell>
              <TableCell>{beneficiary.cabinNumber}</TableCell>
              <TableCell>
                  {beneficiary.needs.map((need) => (
                    <Chip key={need.id} label={need.name} sx={{ marginRight: 1}}/>
                  ))}
              </TableCell>
              <TableCell>{beneficiary.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};
