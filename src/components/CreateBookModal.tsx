import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { useState } from "react";
import { BookPostType, postBook } from "../services/book";

export function CreateBookModal() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState({
    noError: true,
    nameError: false,
    customerError: false
  })
  const [book, setBook] = useState<BookPostType>({
    name: '',
    price: 0,
    customerId: 0
  })

  async function handleForm() {
    if (book.name.trim() === '') {
      setError(prevState => {
        return {
          ...prevState,
          nameError: true
        }
      })
    }

    if (book.customerId === 0) {
      setError(prevState => {
        return {
          ...prevState,
          customerError: true
        }
      })
    }

    if (error.nameError || error.customerError) {
      setError(prevState => {
        return {
          ...prevState,
          noError: false
        }
      })
    } else {
      await postBook(book)
      setError(prevState => {
        return {
          ...prevState,
          noError: true
        }
      })
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      {!error.noError && <Alert severity="error">Colocar os erros aqui!</Alert>}
      <DialogTitle id="form-dialog-title">Preencha os dados do livro</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para criar um novo livro é necessários que todas as informações sejam preenchidas corretamente.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="price"
          label="Preço"
          type="number"
          fullWidth
        />
        <TextField
          margin="dense"
          id="price"
          label="Preço"
          type="number"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleForm()} color="primary">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  )
}