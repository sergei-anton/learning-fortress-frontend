import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';

import { Brick } from './bricks';

import { getComponent } from './bricks/comp/comp_index';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private http: HttpClient) { }

    getBrick(id: string) : BehaviorSubject<Brick> {
        var bs = new BehaviorSubject<Brick>(null);
        console.log("Requesting " + id + " from " + environment.apiUrl);
        // TODO: Change to environment variable!
        this.http.get<Brick>(environment.apiUrl+"brick/"+id)
            .subscribe((data) => {
                data.questions.forEach((question) => {
                    question.components.forEach((component) => {
                        component.component = getComponent(component.name);
                    });
                });
                bs.next(data);
            })
        return bs;
    }
}