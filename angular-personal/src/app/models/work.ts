import { Education } from "./education";
import { WritableSignal, signal } from "@angular/core";


export class Work
{
    constructor(job: Education, details: string[])
    {
        this.job = job;
        this.details = details;
        this.show = signal(false);
    }

    job: Education;
    details: string[];
    show: WritableSignal<boolean>;
}