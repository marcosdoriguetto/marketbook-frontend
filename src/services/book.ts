import axios from 'axios'
import { CustomerType } from './customer'

export type BookType = {
  id: number
  name: string
  price: number
  status: string
  customer: CustomerType
}

const url = "http://localhost:8080"

export async function getBooks() {
  const data: BookType[] =
    await axios.get(`${url}/books`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data
}

export async function getBook(id: number) {
  const data: BookType[] =
    await axios.get(`${process.env.HOST}/books/${id}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data
}

export async function getBooksStatus(status: string) {
  const data: BookType[] =
    await axios.get(`${process.env.HOST}/books/${status}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data
}

export async function postBook({ name, price }: BookType) {
  await axios.post(`${process.env.HOST}/books`, [name, price])
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    })
}

/*export const putCustomer: (customer: CustomerType) => void = customer => {
  axios.put(`${process.env.HOST}/customers/${customer.id}`, [customer.name, customer.email])
}*/

export async function deleteBook(id: number) {
  await axios.delete(`${process.env.HOST}/books/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    })
}
