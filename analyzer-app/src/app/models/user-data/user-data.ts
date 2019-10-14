import { Category } from '../category/category';

export class UserData {
    currentCategories: Category[];
    beginDate: Date;
    endDate: Date;

    constructor(parsedData: any) {
        this.currentCategories = parsedData.currentCategories;
        this.beginDate = parsedData.beginDate;
        this.endDate = parsedData.endDate;
    }

    public noMemberNull(): boolean {
        return this.currentCategories != null && this.currentCategories.length > 0
            && this.beginDate != null && this.endDate != null;
    }
}
