"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const userRouter_1 = require("./routes/userRouter");
app_1.app.use('/users', userRouter_1.userRouter);
