import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import axios from "../../services/Api";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 500,
    justifyContent: "center",
    textAlign: "center",
  },
  field: {
    margin: "10px 0px",
  },
}));

function Create(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleNotify = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };

  const user = props?.location?.state?.user ?? {
    name: "",
    age: "",
    cpf: "",
    city: "",
    civil_status: "",
    state: "",
  };
  const classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(user);

  const history = useHistory();

  const { handleSubmit, register, control } = useForm();
  const submit = async (formData) => {
    setLoading(true);

    try {
      if (user._id) {
        formData._id = user._id;
        const { data } = await axios.put("person/" + user._id, formData);
        if (data) {
          handleNotify("Usuário alterado com sucesso", "success");
        }
      }
      if (!user._id) {
        const { data } = await axios.post("person", formData);
        if (data) {
          handleNotify("Usuário criado com sucesso", "success");
        }
      }

      history.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(submit)} className={classes.form}>
        <TextField
          id="name"
          name="name"
          inputRef={register}
          type="text"
          label="Nome"
          variant="outlined"
          className={classes.field}
          value={state.name}
          onChange={handleChange}
          required
        />
        <TextField
          id="age"
          name="age"
          type="number"
          inputRef={register}
          label="Idade"
          variant="outlined"
          className={classes.field}
          value={state.age}
          onChange={handleChange}
          required
        />
        <TextField
          id="cpf"
          type="number"
          name="cpf"
          inputRef={register}
          label="CPF"
          variant="outlined"
          className={classes.field}
          value={state.cpf}
          onChange={handleChange}
          required
        />
        <TextField
          id="city"
          type="text"
          name="city"
          inputRef={register}
          label="Cidade"
          variant="outlined"
          className={classes.field}
          value={state.city}
          onChange={handleChange}
          required
        />
        <TextField
          type="text"
          id="state"
          name="state"
          inputRef={register}
          label="Estado"
          variant="outlined"
          className={classes.field}
          value={state.state}
          onChange={handleChange}
          required
        />
        <FormControl variant="outlined" className={classes.field}>
          <InputLabel id="estado_civil_label">Estado Civil</InputLabel>
          <Controller
            control={control}
            inputRef={register}
            value={state.civil_status}
            name="civil_status"
            as={
              <Select
                labelId="estado_civil_label"
                name="civil_status"
                id="estado_civil"
                onChange={handleChange}
                label="Estado civil"
                required
                defaultValue={state.civil_status}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
                <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
                <MenuItem value="Separado(a)">Separado(a)</MenuItem>
                <MenuItem value="União Estável">União Estável</MenuItem>
              </Select>
            }
          />
        </FormControl>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Button variant="contained" color="primary" type="submit">
              {user?._id ? "Atualizar" : "Criar"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Create;
