import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './serviceAccount.json';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

export class PreauthMiddleware implements NestMiddleware {
  private fire: any;

  constructor() {
    this.fire = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }
  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;

    if (token === undefined || token === null) {
      this.accessDenied(req.url, res, "Not authorized");
      next();
    }

    this.fire
      .auth()
      .verifyIdToken(token.replace('Bearer ', ''))
      .then(async (decodedToken) => {
        const user = {
          email: decodedToken.email,
        };
        req['user'] = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        this.accessDenied(req.url, res, err);
        next();
      });
    return;
  }
  private accessDenied(url: string, res: Response, err: string) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: `Access denied, ${err}`,
    });
  }
}
