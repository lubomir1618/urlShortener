"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const monk_1 = __importDefault(require("monk"));
const dotenv_1 = __importDefault(require("dotenv"));
const randomstring_1 = __importDefault(require("randomstring"));
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
app.post('/url', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { url, slug } = req.body;
    if (!slug) {
        slug = randomstring_1.default.generate(6).toLowerCase();
    }
    const query = {
        url,
        slug,
        visits: 0,
        date: new Date().getTime()
    };
    const newURL = yield urls.insert(query);
    res.json({ newURL });
}));
app.post('/slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.body;
    try {
        const result = yield urls.findOne({ slug });
        if (result) {
            return res.json({ result: true });
        }
        return res.json({ result: false });
    }
    catch (error) {
        return res.json({ result: false });
    }
}));
app.post('/statistics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    urls
        .find({}, { sort: { visits: -1 } })
        .then((data) => res.json(data))
        .catch((err) => res.status(404));
}));
app.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: slug } = req.params;
    try {
        const result = yield urls.findOneAndUpdate({ slug }, { $inc: { visits: +1 } });
        if (result) {
            return res.redirect(result.url);
        }
        return res.status(404);
    }
    catch (error) {
        return res.status(404);
    }
}));
// Server init 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// @TODO slow down, validate etc., generate slug
// 1. add, 2. slug verify, 3. css
// length od slug
