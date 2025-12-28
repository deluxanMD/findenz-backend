"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_controller_1 = require("@/controllers/example.controller");
const example_service_1 = require("@/services/example.service");
// Mock the service
jest.mock('@/services/example.service');
describe('ExampleController', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getAll', () => {
        it('should return all examples with success response', async () => {
            const mockExamples = [
                { id: '1', name: 'Example 1', createdAt: new Date() },
                { id: '2', name: 'Example 2', createdAt: new Date() },
            ];
            example_service_1.exampleService.getAll.mockResolvedValue(mockExamples);
            await example_controller_1.exampleController.getAll(mockRequest, mockResponse, mockNext);
            expect(example_service_1.exampleService.getAll).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: mockExamples,
            });
        });
        it('should call next with error if service throws', async () => {
            const error = new Error('Service error');
            example_service_1.exampleService.getAll.mockRejectedValue(error);
            await example_controller_1.exampleController.getAll(mockRequest, mockResponse, mockNext);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
    describe('getById', () => {
        it('should return example by id', async () => {
            const mockExample = { id: '1', name: 'Example', createdAt: new Date() };
            mockRequest.params = { id: '1' };
            example_service_1.exampleService.getById.mockResolvedValue(mockExample);
            await example_controller_1.exampleController.getById(mockRequest, mockResponse, mockNext);
            expect(example_service_1.exampleService.getById).toHaveBeenCalledWith('1');
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: mockExample,
            });
        });
        it('should handle errors', async () => {
            const error = new Error('Not found');
            mockRequest.params = { id: '999' };
            example_service_1.exampleService.getById.mockRejectedValue(error);
            await example_controller_1.exampleController.getById(mockRequest, mockResponse, mockNext);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
//# sourceMappingURL=example.controller.test.js.map