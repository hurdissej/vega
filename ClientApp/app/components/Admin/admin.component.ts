import { AuthGuard } from '../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';

@Component({
    template: '<h1> Admin Screen </h1>',
    providers: [AuthGuard]
})

export class AdminComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
