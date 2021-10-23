import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Loading } from "../../components/Loading/Loading";
import { BookResponseType, BookType, getBook } from "../../services/book";
import { Error } from "../ErrorPage/Error";
import { Divider } from "@material-ui/core";

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
      name: ""
    }
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchBook() {
      if (id !== undefined && !isNaN(parseInt(id))) {
        const getBookId = await getBook(parseInt(id))
        if (!getBookId) {
          setError(true)
        }
        setBook(getBookId)
      } else {
        setError(true)
      }
      setLoading(false)
    }

    fetchBook()
  }, [id])

  return (
    <>
      {
        loading ? <Loading /> : (
          <>
            {
              !error ? (
                book.id ? (
                  <div className="content--container">
                    <div className="header--backPage">
                      <ArrowBackIcon fontSize="inherit" className="link--color--gray" />
                      <span className="link--backPage" onClick={() => history.goBack()}>
                        Voltar aos resultados
                      </span>
                    </div>
                    <main className="container">
                      <section className="container--image">
                        <img src={ImageDefault} alt={`Livro ${capitalizeName(book.name)}`} />
                      </section>
                      <section className="container--informations">
                        <div className="container--informations--header">
                          <h1>{capitalizeName(book.name)}</h1>
                          <div className="container--informations--book">
                            Edição Português
                            <Divider orientation="vertical" variant="middle" flexItem />
                            por {capitalizeName(book.customer.name)}
                          </div>
                        </div>
                        <Divider />
                        <div className="container--informations--body">
                          RESUMO
                        </div>
                      </section>
                    </main>
                  </div>
                ) : <Error errorId={2} />
              ) : <Error errorId={1} />
            }
          </>
        )
      }
    </>
  )
}