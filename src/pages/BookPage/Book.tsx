import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Loading } from "../../components/Loading/Loading";
import { BookType, getBook } from "../../services/book";
import { Error } from "../ErrorPage/Error";

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ImageDefault from '../../assets/images/245x346.jpg'

import './style.css'
import { capitalizeName } from "../../utils/capitalizeName";

type ParamsType = {
  id?: string
}

export function Book() {
  const { id } = useParams<ParamsType>()
  const history = useHistory()

  const [book, setBook] = useState<BookType>({
    id: 0,
    name: "",
    price: 0,
    status: "",
    customer: {
      id: 0,
      email: "",
      name: ""
    }
  })
  const bookName = capitalizeName(book.name)
  const customerName = capitalizeName(book.customer.name)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      if (id !== undefined) {
        const getBookId: BookType = await getBook(parseInt(id))
        setError(false)
        setBook(getBookId)
      }
      setLoading(false)
    }

    fetchBook()
  }, [id])

  return (
    <div className="content--container">
      {loading ? <Loading /> : (
        <>
          <div className="header--backPage">
            <ArrowBackIcon fontSize="inherit" className="link--color--gray" />
            <span className="link--backPage" onClick={() => history.goBack()}>
              Voltar aos resultados
            </span>
          </div>
          {!error ? (
            <main className="container">
              <section className="container--image">
                <img src={ImageDefault} alt={`Livro ${bookName}`} />
              </section>
              <section className="container--informations">
                <div className="container--informations--header">
                  <h1>{bookName}</h1>
                  <div>
                    Edição Português
                    <i></i>
                    por {customerName}
                  </div>
                </div>

                <div className="container--informations--header">
                  RESUMO
                </div>
              </section>
            </main>
          ) : <Error />}
        </>
      )
      }
    </div>
  )
}