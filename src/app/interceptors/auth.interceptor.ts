import { HttpInterceptorFn } from '@angular/common/http';

// Esta é a nova forma de escrever um interceptor: uma função, não uma classe.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
   console.log('Auth Interceptor está a ser executado para o URL:', req.url);
  // 1. Pega o token do localStorage.
  const token = localStorage.getItem('authToken');

  // 2. Se não houver token, passa a requisição para a frente sem alterações.
  if (!token) {
    return next(req);
  }

  // 3. Se houver um token, clona a requisição e adiciona o cabeçalho.
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  // 4. Envia a requisição modificada.
  return next(clonedReq);
};