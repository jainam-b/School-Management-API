"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addSchool_1 = require("./routes/addSchool");
const listSchool_1 = require("./routes/listSchool");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.post('/addSchool', addSchool_1.addSchool);
app.get('/listSchools', listSchool_1.listSchools);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
