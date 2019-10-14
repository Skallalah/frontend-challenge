import { Category } from '../category/category';

export class UserData {
    currentCategory: Category;
    beginDate: Date;
    endDate: Date;

    constructor(parsedData: any) {
        this.currentCategory = parsedData.currentCategory;
        this.beginDate = parsedData.beginDate;
        this.endDate = parsedData.endDate;
    }

    public noMemberNull(): boolean {
        return this.currentCategory != null && this.beginDate != null && this.endDate != null;
    }
}
