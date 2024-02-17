import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicRoutes } from '../../public.routes';
import { Images } from '../../../../assets/data/images';
import { AppRoutes } from '../../../app.routes';
import { AdminRoutes } from '../../../admin/admin.routes';
import { CommonService } from '../../../_core/services/common.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'public-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class PublicHeaderComponent {
  public mainLogo: string = Images.devSkillLogo;
  readonly publicRoutes = PublicRoutes;
  readonly appRoutes = AppRoutes;
  readonly adminRoutes = AdminRoutes;
  isOpen: boolean = true;
  constructor(public readonly commonService: CommonService) { }

  openMobileMenu() {
    this.isOpen = !this.isOpen;
  }
}