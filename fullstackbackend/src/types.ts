import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import {Request,Response} from 'express';
import {Session} from 'express-session';

export type SessionWithUserid = Session & {userId?: number};


export type MyContext {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>,
    req: Request & {session?: SessionWithUserid},
    res: Response
}