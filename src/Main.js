import React, { useEffect, useState } from "react";
import axios from "./services/Api";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Paper from "@material-ui/core/Paper";
import { Button, CircularProgress, Tooltip } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
});

export default function BasicTable() {
  const { enqueueSnackbar } = useSnackbar();

  const handleNotify = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };

  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("people");
      setState(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete("folk/" + id);
      handleNotify(data.message, "success");
      getUser();
    } catch (error) {
      handleNotify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (user) => {
    history.push("/create", { user });
  };
  const handleAdd = () => {
    history.push("/create");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleAdd}
      >
        Adicionar pessoa
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Idade</TableCell>
              <TableCell align="right">Estado Civil</TableCell>
              <TableCell align="right">Cidade</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <div className={classes.loader}>
                <div>
                  <CircularProgress />
                </div>
              </div>
            ) : (
              <>
                {state.map((user) => (
                  <TableRow key={user.name}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="right">{user.cpf}</TableCell>
                    <TableCell align="right">{user.age}</TableCell>
                    <TableCell align="right">{user.civil_status}</TableCell>
                    <TableCell align="right">{user.city}</TableCell>
                    <TableCell align="right">{user.state}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Delete">
                        <DeleteIcon
                          color="error"
                          onClick={() => deleteUser(user._id)}
                        />
                      </Tooltip>
                      <Tooltip title="edit">
                        <CreateIcon
                          color="primary"
                          onClick={() => updateUser(user)}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
