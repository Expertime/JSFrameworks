﻿
import { Component, OnInit } from "@angular/core";
import { IQuestion } from "../Domain/Question";
import { ActivatedRoute, Router } from "@angular/router";
import { IQuota } from "../Domain/Quota";
import { QuestionService } from "../Questions/question.service";
import { IAnswer } from "../Domain/Answer";

// FDLM pas de selector car le composant ne sera pas inclus dans un autre composant, il sera juste partie d'une route
@Component(
    {
        templateUrl: "./questiondetail.component.html"
        , styleUrls: ['./questiondetail.component.css']
    }
)
export class QuestionDetailComponent implements OnInit {
    constructor(private _route: ActivatedRoute, private _router: Router, private _questionService: QuestionService) {

    }

    ngOnInit(): void {
        // FDLM le + est un opérateur javascript pour convertir une chaîne en valeur numérique
        let id = +this._route.snapshot.paramMap.get("id");
        this.request(id);
    }

    question: IQuestion;
    quotas: IQuota;
    answers: IAnswer[];
    errorMessage: string;
    loading: boolean;

    // lance une requête au service web API
    private request(id:number): void {
        // FDLM: 
        // https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html

        this.loading = true;

        this._questionService.getQuestionById(id)
            .subscribe(vm => {
                this.question = vm.question;
                this.answers = vm.answers;
                this.quotas = vm.quota;

                this.loading = false;
            }
            , error => {
                this.errorMessage = <any>error;
                this.loading = false;
            }
            );
    }

    callBack(): void {
        this._router.navigate(["/questions"]);
    }
}