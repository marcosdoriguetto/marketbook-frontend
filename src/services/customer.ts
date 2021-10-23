import { api } from "./api"

type CustomerType = {
  id?: number
  name: string
  email: string,
  password: string
}

export type CustomerInformationType = {
  id?: number
  name: string
}

const token = localStorage.getItem('token-marketbook') ?? ''

export async function getCustomers() {
  const { data } = await api.get<CustomerType[]>(`/customers`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return data
}

export async function getCustomer(id: number) {
  const { data } = await api.get<CustomerType>(`/customers/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return data
}

export async function postCustomer({ name, email, password }: CustomerType) {
  await api.post(`/customers`, {
    name: name,
    email: email,
    password: password
  })
}

export async function putCustomer({ id, name, email, password }: CustomerType) {
  await api.put(`/customers/${id}`, {
    name: name,
    email: email,
    password: password
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export async function deleteCustomer(id: number) {
  await api.delete(`/customers/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}
