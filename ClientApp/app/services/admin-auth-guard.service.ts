import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NameService {

    constructor(protected auth: AuthService) { }
}
