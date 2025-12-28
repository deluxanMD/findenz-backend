import { Request, Response, NextFunction } from 'express'
import { exampleController } from '@/controllers/example.controller'
import { exampleService } from '@/services/example.service'

// Mock the service
jest.mock('@/services/example.service')

describe('ExampleController', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockNext: NextFunction

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }
    mockNext = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('should return all examples with success response', async () => {
      const mockExamples = [
        { id: '1', name: 'Example 1', createdAt: new Date() },
        { id: '2', name: 'Example 2', createdAt: new Date() },
      ]

      ;(exampleService.getAll as jest.Mock).mockResolvedValue(mockExamples)

      await exampleController.getAll(mockRequest as Request, mockResponse as Response, mockNext)

      expect(exampleService.getAll).toHaveBeenCalledTimes(1)
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockExamples,
      })
    })

    it('should call next with error if service throws', async () => {
      const error = new Error('Service error')
      ;(exampleService.getAll as jest.Mock).mockRejectedValue(error)

      await exampleController.getAll(mockRequest as Request, mockResponse as Response, mockNext)

      expect(mockNext).toHaveBeenCalledWith(error)
    })
  })

  describe('getById', () => {
    it('should return example by id', async () => {
      const mockExample = { id: '1', name: 'Example', createdAt: new Date() }
      mockRequest.params = { id: '1' }
      ;(exampleService.getById as jest.Mock).mockResolvedValue(mockExample)

      await exampleController.getById(mockRequest as Request, mockResponse as Response, mockNext)

      expect(exampleService.getById).toHaveBeenCalledWith('1')
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockExample,
      })
    })

    it('should handle errors', async () => {
      const error = new Error('Not found')
      mockRequest.params = { id: '999' }
      ;(exampleService.getById as jest.Mock).mockRejectedValue(error)

      await exampleController.getById(mockRequest as Request, mockResponse as Response, mockNext)

      expect(mockNext).toHaveBeenCalledWith(error)
    })
  })
})
