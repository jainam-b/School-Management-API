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
exports.listSchools = void 0;
const db_1 = __importDefault(require("../db"));
const listSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.query;
    // Input validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }
    try {
        const [schools] = yield db_1.default.query('SELECT * FROM schools');
        // Calculate distances and sort by proximity
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);
        const sortedSchools = schools.map((school) => {
            const schoolLatitude = school.latitude;
            const schoolLongitude = school.longitude;
            const distance = Math.sqrt(Math.pow(userLatitude - schoolLatitude, 2) + Math.pow(userLongitude - schoolLongitude, 2));
            return Object.assign(Object.assign({}, school), { distance });
        }).sort((a, b) => a.distance - b.distance);
        res.json({ schools: sortedSchools });
    }
    catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.listSchools = listSchools;
