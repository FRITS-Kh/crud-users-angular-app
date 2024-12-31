import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { User } from '../user/user.interfaces';

const mockUsers: User[] = [
  {
    id: 164381,
    name: 'Aurelie MacInerney',
    email: 'amacinerney0@vistaprint.com',
  },
  {
    id: 184022,
    name: 'Henry Fehely',
    email: 'hfehely1@cbsnews.com',
  },
  {
    id: 421578,
    name: 'Dennie Giannoni',
    email: 'dgiannoni2@amazon.com',
    additionalEmails: [
      'swoodwing3@networkadvertising.org',
      'kbrain4@telegraph.co.uk',
    ],
  },
  {
    id: 883257,
    name: 'LoremipsumdolorsitametconsecteturadipisicingelitpVeritatiskoptiodAdmollitiayaliquidsintutvoluptatiby',
    email:
      'LoremipsumdolorsiipisicingelitpVeritatiskoptiodAdmollitiayaliqui@sintutvoluptat.ts',
  },
];

const randomDelay = (min: number = 500, max: number = 2000): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const syncWithLocalStorage = (users: User[]) => {
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

const loadFromLocalStorage = (): User[] => {
  const savedUsers = localStorage.getItem('mockUsers');

  return savedUsers ? JSON.parse(savedUsers) : [...mockUsers];
};

export const usersBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const { method, url, body } = req;

  if (url.endsWith('/api/users')) {
    if (method === 'GET') {
      const users = loadFromLocalStorage();

      return of(new HttpResponse({ status: 200, body: users })).pipe(
        delay(randomDelay())
      );
    }

    if (method === 'POST') {
      const newUser = body as User;
      const users = loadFromLocalStorage();
      const id = Math.floor(100000 + Math.random() * 900000);
      const createdUser = { ...newUser, id };

      users.push(createdUser);
      syncWithLocalStorage(users);

      return of(new HttpResponse({ status: 201, body: createdUser })).pipe(
        delay(randomDelay())
      );
    }
  }

  if (url.match(/\/api\/users\/\d+$/)) {
    const userId = parseInt(url.split('/').pop() || '', 10);

    if (method === 'GET') {
      const users = loadFromLocalStorage();
      const user = users.find((u) => u.id === userId);
      const response = user ? { status: 200, body: user } : { status: 404 };

      return of(new HttpResponse(response)).pipe(delay(randomDelay()));
    }

    if (method === 'PUT') {
      const updatedUser = body as User;
      const users = loadFromLocalStorage();
      const index = users.findIndex((u) => u.id === userId);

      if (index > -1) {
        users[index] = updatedUser;
        syncWithLocalStorage(users);

        return of(new HttpResponse({ status: 200, body: updatedUser })).pipe(
          delay(randomDelay())
        );
      }
    }

    if (method === 'DELETE') {
      const users = loadFromLocalStorage();
      const filteredUsers = users.filter((u) => u.id !== userId);
      syncWithLocalStorage(filteredUsers);

      return of(new HttpResponse({ status: 204 })).pipe(delay(randomDelay()));
    }
  }

  return next(req);
};
