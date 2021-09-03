import { Grid, IconButton, InputBase, Paper, Button, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from "@material-ui/icons/Search"
import { useState } from 'react';
import { CreateBookModal } from './CreateBookModal';

export function Header() {
  const [openModal, setOpenModal] = useState(false)

  function handleOpenModal() {
    setOpenModal(true)
  }

  return (
    <header>
      {openModal && <CreateBookModal onClose={() => setOpenModal(false)} />}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={2}>
          <Box display="flex" justifyContent="center">
            <img style={{ justifyContent: "center" }} src="" alt="Logo" />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Paper component="form" style={{ display: "flex", alignItems: "center" }}>
            <InputBase style={{ flex: 1, padding: "0px 12px" }} placeholder="Digite o nome do livro" />
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => { handleOpenModal() }}
          >Create</Button>
        </Grid>
      </Grid>
    </header>
  )
}