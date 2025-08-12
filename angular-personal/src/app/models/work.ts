import { Education } from "./education";


export class Work
{
    constructor(job: Education, details: string[])
    {
        this.job = job;
        this.details = details;
        this.show = false;
    }

    job: Education;
    details: string[];
    show: boolean;
}