import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../../../src/infraestructure/middleware/authMiddleware';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authenticateToken middleware', () => {
  const mockRequest = (headerValue?: string): Partial<Request> => ({
    headers: {
      authorization: headerValue,
    },
  });

  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.sendStatus = jest.fn().mockReturnValue(res);
    return res;
  };

  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna 401 si no se proporciona token', () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;

    authenticateToken(req, res, nextFunction);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('retorna 403 si el token es inválido', () => {
    const req = mockRequest('Bearer invalidtoken') as Request;
    const res = mockResponse() as Response;

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticateToken(req, res, nextFunction);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('llama a next() si el token es válido', () => {
    const req = mockRequest('Bearer validtoken') as Request;
    const res = mockResponse() as Response;
    const userData = { id: '123', email: 'test@example.com' };

    (jwt.verify as jest.Mock).mockReturnValue(userData);

    authenticateToken(req, res, nextFunction);

    expect((req as any).user).toEqual(userData);
    expect(nextFunction).toHaveBeenCalled();
  });
});
