export interface Example {
  id: string
  name: string
  createdAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}
