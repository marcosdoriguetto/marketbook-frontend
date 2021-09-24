import { Link } from 'react-router-dom';

import { Grid, IconButton, InputBase, Paper, Button, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from "@material-ui/icons/Search"
import { ChangeEvent, useState } from 'react';
import { CreateBookModal } from '../Modal/CreateBookModal';

import './style.css'

export function Header() {
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState('')

  function handlerChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <header className="header">
      {openModal && <CreateBookModal onClose={() => setOpenModal(false)} />}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="header--container"
      >
        <Grid item xs={2}>
          <Box className="header--item--box">
            <img className="header--logo" src="" alt="Logo" />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Paper component="form" className="header--label">
            <InputBase onChange={handlerChangeSearch} className="header--label--input" placeholder="Digite o nome do livro" />
            <Link to={`/books/name?name=${search}`}>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={1}>
          <Box className="header--item--box">
            <p>User</p>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box className="header--item--box">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => { setOpenModal(true) }}
            >Create</Button>
          </Box>
        </Grid>
      </Grid>
    </header>
  )
}