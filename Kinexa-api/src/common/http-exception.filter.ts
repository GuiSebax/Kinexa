import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = 'Erro interno do servidor';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();

            message = typeof res === 'string' ? res : (res as any).message || res;
        }

        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            status = HttpStatus.BAD_REQUEST;

            switch (exception.code) {
                case 'P2002':
                    message = 'Violação de chave única: um registro com esse valor já existe.';
                    break;
                case 'P2025':
                    message = 'Registro não encontrado.';
                    break;
                default:
                    message = 'Erro do cliente Prisma.';
            }
        }

        response.status(status).json({
            statusCode: status,
            error: HttpStatus[status],
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        })
    }
}