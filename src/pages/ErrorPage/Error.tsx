import './style.css'

type ErrorType = {
  errorId: number
}

export function Error({ errorId }: ErrorType) {
  let errorMessage;

  switch (errorId) {
    case 1:
      errorMessage = "Algo deu errado😥"
      break;
    case 2:
      errorMessage = "Nada foi encontrado😌"
  }

  return (
    <div className="error">
      <h1>{errorMessage}</h1>
    </div>
  )
}