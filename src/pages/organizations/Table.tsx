import { Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Link } from "react-router-dom";
import { Organization } from "../../client/src";
import { useNeedList } from "../../data";

interface TableProps {
  data: Required<Organization>[];
}

export const OrganizationsTable: React.FC<TableProps> = ({ data }) => {
  const { data: needs = [] } = useNeedList();
  const needsMap = new Map(needs.map((need) => [need.id, need.name]));

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Needs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <Link to={`/organizations/${org.id}/info`}>{org.name}</Link>
                </TableCell>
                <TableCell>{org.phoneNumber}</TableCell>
                <TableCell>{org.description}</TableCell>
                <TableCell>
                  {org.needs.filter(Boolean).map((needId) => (
                    <Chip
                      key={needId}
                      label={needsMap.get(needId)}
                      sx={{ margin: 1 }}
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
