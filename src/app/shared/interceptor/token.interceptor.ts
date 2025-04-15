import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { urls } from '../utils/urlList';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string = localStorage.getItem('token') || '';
  const router = inject(Router);

  // Bypass token for public URLs
  for (const e of urls) {
    if (req.url.includes(e)) {
      return next(req);
    }
  }

 
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', token),
    });

    console.log('✅ Token added to headers:', token);
    return next(modifiedReq);
  
 
};
