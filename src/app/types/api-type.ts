import { Movie } from "../catalog/types"

export type ApiResponse = {
  Search: Movie[]
  totalResults: string
  Response: boolean
  Error?: string
}
