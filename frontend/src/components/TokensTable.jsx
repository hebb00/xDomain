import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useFetchData from "../hooks/useFetchData";
import { tokens } from "../theme";
import config from "../config";
import { CircularProgress, useTheme } from "@mui/material";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.token}</TableCell>
        <TableCell align="center">{row.path}</TableCell>
        <TableCell align="center">{row.amount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">path</TableCell>
                    <TableCell align="center">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.paths.map((p) => (
                    <TableRow key={p.path}>
                      <TableCell align="center">{p.path}</TableCell>
                      <TableCell align="center">{p.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    token: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    paths: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function TokensTable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, error } = useFetchData(
    `${config.BASE_URL}/token_totals_paths`
  );
  const {
    data: keys,
    loading: loadingKeys,
    error: errorKeys,
  } = useFetchData(`${config.BASE_URL}/token_paths`);

  if (loading || loadingKeys) {
    return <CircularProgress />;
  }

  if (error || errorKeys) {
    return <div>Error: {error}</div>;
  }

  let temp = [];
  let token = [];
  let max = -Infinity;
  let path, sortedPaths;
  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "number") {
        temp.push({ path: key, amount: Math.round(obj[key]), token: obj.token });
        if (obj[key] > max) {
          max = obj[key];
          path = key;
        }
      }
    });
    sortedPaths = temp.sort((a, b) => b.amount - a.amount);
    token.push({
      path: path,
      amount: Math.round(max),
      token: obj.token,
      paths: sortedPaths.slice(1),
    });
    temp = [];
    max = -Infinity;
  });

  const rows = token.sort((a, b) => b.amount - a.amount);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table bgColor={colors.primary[400]} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center"> Token</TableCell>
              <TableCell align="center">Path</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.token} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
