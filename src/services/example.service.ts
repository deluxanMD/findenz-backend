import { Example } from '../types'

export const exampleService = {
  getAll: async (): Promise<Example[]> => {
    // Your business logic here
    return [
      {
        id: '1',
        name: 'Example 1',
        createdAt: new Date(),
      },
    ]
  },

  getById: async (id: string): Promise<Example | null> => {
    // Your business logic here
    return {
      id,
      name: 'Example',
      createdAt: new Date(),
    }
  },
}
