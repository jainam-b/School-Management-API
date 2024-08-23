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
exports.addSchool = void 0;
const db_1 = __importDefault(require("../db"));
const addSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, latitude, longitude } = req.body;
    // Input validation
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const [result] = yield db_1.default.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [name, address, latitude, longitude]);
        res.status(201).json({ message: 'School added successfully.', data: result });
    }
    catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.addSchool = addSchool;
