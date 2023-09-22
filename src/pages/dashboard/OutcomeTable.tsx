import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

import { PictorialSeries } from "./utils";

interface TableProps {
  outcomes: Required<PictorialSeries>[];
}

export const OutcomeTable: React.FC<TableProps> = ({ outcomes }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Outcome</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outcomes.map((outcome) => (
            <TableRow key={outcome.name}>
              <TableCell>{outcome.name}</TableCell>
              <TableCell>{outcome.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
