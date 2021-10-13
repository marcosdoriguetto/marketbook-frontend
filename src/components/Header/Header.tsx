import { Grid, IconButton, InputBase, Paper, Button, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from "@material-ui/icons/Search"
import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CreateBookModal } from '../Modal/CreateBookModal';

import './style.css'

export function Header() {
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState('')

  const history = useHistory()

  function handlerChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handlerSendSearch(event: FormEvent) {
    event.preventDefault()

    if (search.length > 0) {
      history.push(`/books/book?name=${search}`)
    } else {
      history.push('/')
    }
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
            <Link to="/" onClick={() => setSearch('')}><img className="header--logo" src="" alt="Logo" /></Link>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Paper component="form" className="header--label" onSubmit={handlerSendSearch}>
            <InputBase value={search} onChange={handlerChangeSearch} className="header--label--input" placeholder="Digite o nome do livro" />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
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