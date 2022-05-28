import React from 'react';
import {  Navigate } from 'react-router-dom';
import { HomePage } from '../HomePage';

export const PrivateRoute = () => (

     localStorage.getItem('user')
            ? < HomePage />  : <Navigate to="/login" replace />


)