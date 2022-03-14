import { Injectable } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private accessChecker: NbAccessChecker) { }

  findMenuItem(dataToFind: string, menuItems: NbMenuItem[]): NbMenuItem {
    return menuItems.find(t => t.data == dataToFind);
  }

  getSubMenuItem = function (data: string, subMenuItems: NbMenuItem[]) {
    if (subMenuItems) {
      for (var i = 0; i < subMenuItems.length; i++) {
        if (subMenuItems[i].data == data) {
          return subMenuItems[i];
        }
        var found = this.getSubMenuItem(data, subMenuItems[i].children);
        if (found) return found;
      }
    }
  };



  setMenuItemVisibility(dataToFind: string, permission: string, resource: string, menuItems: NbMenuItem[]) {
    var menuItem = this.getSubMenuItem(dataToFind, menuItems);
    console.log('menu searched:' + dataToFind);
    console.log('menu found:' + menuItem);
    if (menuItem == null) return;
    console.log('setting auth for menu:' + menuItem.data);
    this.accessChecker.isGranted(permission, resource).subscribe(res => { menuItem.hidden = !res });
  }

  //get sub menu for one item
  getItemSubMenu = function (data: string, subMenuItem: NbMenuItem) {
    if (subMenuItem) {
      if (subMenuItem.data == data) { return subMenuItem }
      var found = this.getItemSubMenu(data, subMenuItem.children)
      if (found) return found
    }
  }


  //set visibility for one item
  enableMenuItem(dataToFind: string, permission: string, resource: string, menuItems: NbMenuItem) {
    var menuItem = this.getItemSubMenu(dataToFind, menuItems);
    console.log('menu searched:' + dataToFind);
    console.log('menu found:' + menuItem);
    if (menuItem == null) return;
    console.log('setting auth for menu:' + menuItem.data);
    this.accessChecker.isGranted(permission, resource).subscribe(res => { menuItem.hidden = res });
  }

  disableMenuItem(dataToFind: string, permission: string, resource: string, menuItems: NbMenuItem) {
    var menuItem = this.getItemSubMenu(dataToFind, menuItems);
    console.log('menu searched:' + dataToFind);
    console.log('menu found:' + menuItem);
    if (menuItem == null) return;
    console.log('setting auth for menu:' + menuItem.data);
    this.accessChecker.isGranted(permission, resource).subscribe(res => { menuItem.hidden = !res });
  }

}
