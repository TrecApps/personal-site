export class Education
{
    constructor(school: string, gradYear: string)
    {
        this.gradYear = gradYear;
        this.school = school;
    }
    school: String = '';
    gradYear: string = '';
}