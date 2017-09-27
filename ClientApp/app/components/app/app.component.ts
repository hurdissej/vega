import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgress } from './../../services/progress-service';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        {provide: BrowserXhr, useClass: BrowserXhrWithProgress},]
})
export class AppComponent {
}
