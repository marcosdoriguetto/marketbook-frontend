import axios from 'axios'
import { CustomerType } from './customer'

type BookResponse = {
  content: BookType[]
}

export type BookType = {
  id: number
  name: string
  price: number
  status: string
  customer: CustomerType
}

export type BookPostType = {
  name: string
  price: number
  customerId: number
}

const url = "http://localhost:8080"

export async function getBooks() {
  const data: BookResponse =
    await axios.get(`${url}/books`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data.content
}

export async function getBooksByName(name: String, page: number) {
  const data: BookResponse =
    await axios.get(`${url}/books?name=${name}&page=${page}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data.content
}

export async function getBook(id: number) {
  const data: BookType =
    await axios.get(`${url}/books/${id}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data
}

export async function getBooksStatus(status: string) {
  const data: BookResponse =
    await axios.get(`${url}/books/${status}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data.content
}

export async function postBook({ name, price, customerId }: BookPostType) {
  await axios.post(`${url}/books`, {
    name: name,
    price: price,
    customer_id: customerId
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    })
}

/*export const putCustomer: (customer: CustomerType) => void = customer => {
  axios.put(`${url}/customers/${customer.id}`, [customer.name, customer.email])
}*/

export async function deleteBook(id: number) {
  await axios.delete(`${url}/books/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    })
}
