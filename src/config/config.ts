import dotenv from 'dotenv';
dotenv.config();
export const config ={
    PORT :process.env.PORT,
    DATA_BASE_URL: process.env.DATA_BASE_URL || "postgres://postgres:root@localHost:5432/gallery",
    SECRET: process.env.SECRET || "genjutsu"
}