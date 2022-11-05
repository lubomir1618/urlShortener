"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('dist/client'));
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path_1.default.resolve(__dirname, 'client', 'index.html'));
});
const monk_1 = __importDefault(require("monk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = (0, monk_1.default)(process.env.MONGO_URL || '');
const urls = db.get('urls'); // add type and so on
console.log('MDBU', process.env.MONGO_URL);
//console.log('urls', urls);
