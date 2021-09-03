import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { useState } from "react";
import { BookPostType, postBook } from "../services/book";

type ModalOpenType = {
  onClose: () => void
}

type ErrorsType = {
  name: string,
  price: string,
  customerId: string
}

export function CreateBookModal({ onClose = () => { } }: ModalOpenType) {
  const [errors, setErrors] = useState({
    nameError: false,
    priceError: false,
    customerError: false
  })
  const [book, setBook] = useState<BookPostType>({
    name: '',
    price: '',
    customerId: 0
  })

  async function handleForm() {
    if (!errors.nameError && !errors.customerError) {
      console.log(".")
      await postBook(book)
    }
  }

  function handleValidateForm() {
    const errors: ErrorsType = {
      name: '',
      price: '',
      customerId: ''
    }

    if (book.name.trim() === '') {
      setErrors(prevState => {
        return {
          ...prevState,
          nameError: true
        }
      })

      errors.name = "Por favor, insira o nome do livro."
    }

    if (book.price.trim() === '') {
      setErrors(prevState => {
        return {
          ...prevState,
          nameError: true
        }
      })

      errors.price = "Por favor, insira um preço"
    }

    if (book.customerId === 0) {
      setErrors(prevState => {
        return {
          ...prevState,
          customerError: true
        }
      })

      errors.customerId = "Por favor, selecione o cliente responsável."
    }

    handleForm()
  }

  return (
    <Dialog
      open={true}
      onClose={() => onClose()}
      aria-labelledby="form-dialog-title"
    >
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
          onChange={event => setBook(prevState => {
            return {
              ...prevState,
              name: event.target.value
            }
          })}
          value={book.name}
          error={errors.nameError}
          helperText={errors.nameError && "Porfavor, insira o nome do livro."}
        />
        <TextField
          margin="dense"
          label="Preço"
          name="price"
          InputLabelProps={{ shrink: true }}
          onChange={event => setBook(prevState => {
            return {
              ...prevState,
              price: event.target.value
            }
          })}
          fullWidth
          value={book.price}
        />
        <TextField
          margin="dense"
          id="customer"
          label="Cliente"
          onChange={event => setBook(prevState => {
            return {
              ...prevState,
              customerId: parseInt(event.target.value)
            }
          })}
          value={book.customerId}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleValidateForm()} color="primary">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  )
}