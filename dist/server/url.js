"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const monk_1 = __importDefault(require("monk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = (0, monk_1.default)(process.env.MONGO_URL || '');
const urls = db.get('urls'); // add type and so on
console.log('urls', urls);
