"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const example_route_1 = __importDefault(require("@/routes/example.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/examples', example_route_1.default);
describe('Example Routes', () => {
    describe('GET /api/examples', () => {
        it('should return 200 and array of examples', async () => {
            const response = await (0, supertest_1.default)(app).get('/api/examples').expect(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });
    describe('GET /api/examples/:id', () => {
        it('should return 200 and example object', async () => {
            const response = await (0, supertest_1.default)(app).get('/api/examples/1').expect(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('name');
        });
    });
});
//# sourceMappingURL=example.routes.test.js.map