
import { CustomerInformationType } from './customer'
import { api } from './api'

export type BookResponseType = {
  item: BookType[]
  totalPages: number
  currentPage: number
}

export type BookType = {
  id: number
  name: string
  price: number
  status: string
  customer: CustomerInformationType
}

export type BookPostType = {
  name: string
  price: number
  customerId: number
}

export async function getBooks(page?: number) {
  const { data } = await api.get<BookResponseType>(`/books?page=${page}`)
  return data
}

export async function getBooksByName(name: String, page?: number) {
  const { data } = await api.get<BookResponseType>(`/books?name=${name}&page=${page}`)
  return data
}

export async function getBook(id: number) {
  const { data } = await api.get<BookType>(`/books/${id}`)
  return data
}

export async function getBooksActives() {
  const { data } = await api.get<BookType>(`/books/actives`)
  return data
}

export async function postBook({ name, price, customerId }: BookPostType) {
  await api.post(`/books`, {
    name: name,
    price: price,
    customer_id: customerId
  })
}

/*export const putCustomer: (customer: CustomerType) => void = customer => {
  axios.put(`${url}/customers/${customer.id}`, [customer.name, customer.email])
}*/

export async function deleteBook(id: number) {
  await api.delete(`/books/${id}`)
}
