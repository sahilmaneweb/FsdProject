export default class GroupModel{
    id: string;
    batch: string;
    title: string;
    description: string;
    students: string[];
    
    constructor() {
        this.id = '0';
        this.batch = '';
        this.title = '';
        this.description = '';
        this.students = [];
    }
}