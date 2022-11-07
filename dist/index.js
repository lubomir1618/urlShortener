"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const monk_1 = __importDefault(require("monk"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('dist/client'));
// DB connect (urlShortener)
dotenv_1.default.config();
const db = (0, monk_1.default)(process.env.MONGO_URL || '');
const urls = db.get('urls');
// Routing
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path_1.default.resolve(__dirname, 'client', 'index.html'));
});
app.get('/test', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.write('test');
    console.log('test');
});
// Server init 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
