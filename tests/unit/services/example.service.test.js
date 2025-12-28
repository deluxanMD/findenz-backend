"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_service_1 = require("@/services/example.service");
describe('Example Service', () => {
    describe('getAll', () => {
        it('should return an array of examples', async () => {
            const result = await example_service_1.exampleService.getAll();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
        it('should return examples with correct structure', async () => {
            const result = await example_service_1.exampleService.getAll();
            const example = result[0];
            expect(example).toHaveProperty('id');
            expect(example).toHaveProperty('name');
            expect(example).toHaveProperty('createdAt');
            expect(example.createdAt).toBeInstanceOf(Date);
        });
    });
    describe('getById', () => {
        it('should return an example with the given id', async () => {
            const testId = '123';
            const result = await example_service_1.exampleService.getById(testId);
            expect(result).toBeDefined();
            expect(result?.id).toBe(testId);
        });
        it('should return an example with correct structure', async () => {
            const result = await example_service_1.exampleService.getById('1');
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('createdAt');
        });
    });
});
//# sourceMappingURL=example.service.test.js.map