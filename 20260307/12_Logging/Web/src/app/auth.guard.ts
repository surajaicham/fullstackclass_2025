import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    return true;
  } else {
    window.alert('Please login first!');
    return false;
  }
};
