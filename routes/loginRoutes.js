import express from 'express';
import {login} from '../controllers/auth.js';

const loginRoutes = express.Router();

loginRoutes.post('/login',login);

export  {loginRoutes};