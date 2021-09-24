import { CircularProgress } from "@material-ui/core";

import './style.css'

export function Loading() {
  return (
    <div className="loading">
      <CircularProgress size={60} color="primary" />
    </div>
  )
}