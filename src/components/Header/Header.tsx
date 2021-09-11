import { Grid, IconButton, InputBase, Paper, Button, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from "@material-ui/icons/Search"
import { useState } from 'react';
import { CreateBookModal } from '../Modal/CreateBookModal';

import './style.css'

export function Header() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <header className="header">
      {openModal && <CreateBookModal onClose={() => setOpenModal(false)} />}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Box className="header--item--box" display="flex" justifyContent="center" >
            <img className="header--logo" src="" alt="Logo" />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Paper component="form" className="header--label">
            <InputBase className="header--label--input" placeholder="Digite o nome do livro" />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <p>User</p>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
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