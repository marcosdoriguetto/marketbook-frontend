import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  NativeSelect,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { BookPostType, postBook } from "../../services/book";
import { CustomerInformationType, getCustomers } from "../../services/customer";
import toast, { Toaster } from 'react-hot-toast';

import './style.css'

type ModalOpenType = {
  onClose: () => void
}

type BookFormType = {
  name: string
  price: string
  customerId: string
}

export function CreateBookModal({ onClose = () => { } }: ModalOpenType) {
  const [errors, setErrors] = useState({
    nameError: false,
    priceError: false,
    customerError: false
  })

  const [book, setBook] = useState<BookFormType>({
    name: '',
    price: '',
    customerId: '0'
  })

  const [customers, setCustomers] = useState<CustomerInformationType[]>([])

  useEffect(() => {
    async function fetchData() {
      const getAllCustomers = await getCustomers()

      setCustomers(getAllCustomers)
    }

    fetchData()
  }, [])

  async function handleValidateForm() {
    let errorsValidate = 0

    setErrors({
      nameError: false,
      customerError: false,
      priceError: false
    })

    if (book.name.trim().length < 4) {
      setErrors(prevState => {
        return {
          ...prevState,
          nameError: true
        }
      })

      errorsValidate++
    }

    if (book.price.trim() === '' || book.price.includes(',')) {
      setErrors(prevState => {
        return {
          ...prevState,
          priceError: true
        }
      })

      errorsValidate++
    }

    if (parseInt(book.customerId) === 0) {
      setErrors(prevState => {
        return {
          ...prevState,
          customerError: true
        }
      })

      errorsValidate++
    }

    if (errorsValidate === 0) {
      const inputPostBook: BookPostType = {
        name: book.name,
        price: parseFloat(book.price),
        customerId: parseInt(book.customerId)
      }

      await postBook(inputPostBook)

      setBook({
        name: '',
        price: '',
        customerId: '0'
      })

      toast.success('Livro registrado com sucesso!')
    }
  }

  return (
    <Dialog
      open={true}
      onClose={() => onClose()}
      aria-labelledby="form-dialog-title"
      className="form"
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <DialogTitle id="form-dialog-title">Preencha os dados do livro</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para criar um novo livro ?? necess??rio que todas as informa????es sejam preenchidas corretamente.
        </DialogContentText>
        <TextField
          margin="dense"
          label="Nome"
          name="name"
          InputLabelProps={{ shrink: true }}
          fullWidth
          onChange={event => setBook(prevState => {
            return {
              ...prevState,
              name: event.target.value
            }
          })}
          value={book.name}
          error={errors.nameError}
          helperText={errors.nameError && "Porfavor, insira um nome com mais de 3 caracteres."}
        />
        <TextField
          margin="dense"
          label="Pre??o"
          name="price"
          type="number"
          InputLabelProps={{ shrink: true }}
          className="form--label--price"
          onChange={event => setBook(prevState => {
            return {
              ...prevState,
              price: event.target.value
            }
          })}
          fullWidth
          value={book.price}
          error={errors.priceError}
          helperText={errors.priceError && "Porfavor, insira o valor do livro."}
        />
        <FormControl margin="dense" fullWidth error={errors.customerError}>
          <InputLabel>Cliente</InputLabel>
          <NativeSelect value={parseInt(book.customerId)} onChange={event => setBook(prevState => {
            return {
              ...prevState,
              customerId: event.target.value
            }
          })}>
            <option value={0}>Selecione um customer</option>
            {
              customers.length > 0 &&
              customers.map(customer => {
                return (
                  <option
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name}
                  </option>
                )
              })
            }
          </NativeSelect>
          {errors.customerError && <p className={"MuiFormHelperText-root Mui-error MuiFormHelperText-marginDense"}>Porfavor, selecione um customer</p>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleValidateForm()} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}