/**
 * Define the menu items
 */
export class MenuItem{


    /**
     * 
     * @param icon
     * @param link
     * @param name
     * @param description
     * @param groupRequired The gruop that is required in order to display the menuItem
     */
    constructor(public icon:string,  public link:string, public name:string, public description?:string, public groupRequired?:string){

    }
}