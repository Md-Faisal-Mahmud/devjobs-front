import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminRoutes, ElementRoutes, SettingRoutes, UserManagementRoutes } from '../../admin.routes';
import { Images } from '../../../../assets/data/images';
import { AppRoutes } from '../../../app.routes';
import { CommonService } from '../../../_core/services/common.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LogoutModalComponent } from '../../../shared/components/logout-modal/logout-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  public devSkillLogo: string = Images.devSkillLogo;

  sidebarIsCollapsed: boolean = true;
  readonly appRoutes = AppRoutes;
  readonly adminRoutes = AdminRoutes;
  readonly settingRoutes = SettingRoutes;
  readonly elementRoutes = ElementRoutes;
  readonly userManagementRoutes = UserManagementRoutes;
  private routerSubscription: Subscription = new Subscription();

  @Output() sidebarCollapsed = new EventEmitter<boolean>();

  constructor(
    public readonly commonServices: CommonService,
    private readonly elementRef: ElementRef,
    private router: Router,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.subMenuToggleHandlerOnRouteChange();
    setTimeout(() => {
      this.subMenuToggleHandlerOnPageReload();
    }, 1);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  sidebarCollapsedHandler = (): void => {
    this.sidebarIsCollapsed = !this.sidebarIsCollapsed;
    this.sidebarCollapsed.emit(this.sidebarIsCollapsed);

    const subMenu = this.elementRef.nativeElement.querySelectorAll('.sub-menu');

    subMenu.forEach((subMenu: Element) => {
      if (subMenu.getAttribute('aria-expanded') == 'true')
        subMenu.setAttribute('aria-expanded', 'false');

      subMenu.toggleAttribute('icon-hidden');
    });
  };

  subMenuToggleHandler = (event: MouseEvent): void => {
    const elem = event.target as HTMLElement;
    const subMenu = elem.closest('a.sub-menu') as Element;

    if (subMenu.getAttribute('aria-expanded') == 'false')
      subMenu.setAttribute('aria-expanded', 'true');
    else subMenu.setAttribute('aria-expanded', 'false');
  };

  subMenuToggleHandlerOnPageReload = (): void => {
    const elem = this.elementRef.nativeElement
      .querySelector('[aria-current="page"]')
      .closest('ul.sub-menu-item') as Element;

    const subMenu = elem?.previousSibling as Element;

    subMenu?.setAttribute('aria-expanded', 'true');
  };

  subMenuToggleHandlerOnRouteChange = (): void => {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const subMenu =
          this.elementRef.nativeElement.querySelectorAll('.sub-menu');
        const elem = this.elementRef.nativeElement.querySelector(
          `[href='${event.url}']`
        ) as Element;

        if (elem.closest('ul.sub-menu-item')) return;

        subMenu.forEach((subMenu: Element) => {
          if (subMenu.getAttribute('aria-expanded') == 'true')
            subMenu.setAttribute('aria-expanded', 'false');
        });
      }
    });
  };

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const modalDialog = this.matDialog.open(LogoutModalComponent, dialogConfig);
  }
}
