﻿import { IOwner } from "./Owner"
import { IComment } from "./Comment"

export interface IQuestion {
    question_id: number;
    title: string;
    is_answered: boolean;
    view_count: number;
    answer_count: number;
    creation_date: number;
    last_activity_date: number;
    tags: string[]

    owner: IOwner;
    comments?: IComment[] ;
}