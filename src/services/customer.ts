import axios from 'axios'

export type CustomerType = {
  id: number
  name: string
  email: string
}

export async function getCustomers() {
  const data: CustomerType[] =
    await axios.get(`${process.env.DEFAULT_HOST}/customers`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data
}

export async function getCustomer(id: number) {
  const data: CustomerType[] =
    await axios.get(`${process.env.DEFAULT_HOST}/customers/${id}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })

  return data
}

export async function postCustomer({ name, email }: CustomerType) {
  await axios.post(`${process.env.DEFAULT_HOST}/customers`, [name, email])
}

export async function putCustomer(customer: CustomerType) {
  await axios.put(`${process.env.DEFAULT_HOST}/customers/${customer.id}`, [customer.name, customer.email])
}

export async function deleteCustomer(id: number) {
  await axios.delete(`${process.env.DEFAULT_HOST}/customers/${id}`)
}
