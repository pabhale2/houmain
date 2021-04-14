import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener
} from '@angular/core';
import { Routes } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { ROUTES } from './sidebar-items';
import { RouteInfo } from './sidebar.metadata';
declare const Waves: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  public sidebarItems: any[];
  showMenu = '';
  showSubMenu = '';
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  headerHeight = 60;
  user;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private tokenStorageService: TokenStorageService
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      roles: []
    };
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callMenuToggle(event: any, element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
    const hasClass = event.target.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(event.target, 'toggled');
    } else {
      this.renderer.addClass(event.target, 'toggled');
    }
  }
  callSubMenuToggle(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }
  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    let highestRole = this.findHighestUserRole(this.user.roles);
    this.user['ROLE'] = highestRole;
    this.filterMenuItems();
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  findHighestUserRole(roles: string[]) {
    let sortedArray = roles.sort((a, b) => a['id'].localeCompare(b['id']));
    return sortedArray[0];
  }
  filterMenuItems() {
    this.sidebarItems = [];
    var localRouter: RouteInfo[] = [];
    Object.assign(localRouter, ROUTES);
    for (const menuItem of localRouter) {
      let count = 0;
      if (menuItem.accessControl.indexOf(this.user['ROLE'].roleName) >= 0) {
        if (menuItem.submenu) {
          let i1 = 0;
          for (const subMenu1 of menuItem.submenu) {
            if (subMenu1.accessControl.indexOf(this.user['ROLE'].roleName) >= 0) {
              let i2 = 0;
              for (const subMenu2 of subMenu1.submenu) {
                if (subMenu2.accessControl.indexOf(this.user['ROLE'].roleName) === -1) {
                  menuItem.submenu.splice(i2, 1);
                }
                i2++;
              }
            } else {
              menuItem.submenu.splice(i1, 1);
            }
            i1++;
          }
        }
        this.sidebarItems.push(menuItem);
      }
      count++;
    }
  }

  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
    // Set Waves
    // Waves.attach('.menu .list a', ['waves-block']);
    // Waves.init();
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
}
