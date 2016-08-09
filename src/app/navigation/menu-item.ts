/**
 * Define the menu items
 */
export class MenuItem{

    public open=false; // Visual state of the menu item

    /**
     * 
     * @param icon
     * @param link
     * @param name
     * @param description
     * @param subMenu
     * @param groupRequired The group that is required in order to display the menuItem
     */
    constructor(public icon:string,  public link:string, public name:string, public description?:string, public subMenu?:MenuItem[], public groupRequired?:string){

    }
}