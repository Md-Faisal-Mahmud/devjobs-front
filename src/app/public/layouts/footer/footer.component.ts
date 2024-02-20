import { Component } from '@angular/core';
import { DatetimeHelper } from '../../../_core/helpers/datetime.helper';
import { Images } from '../../../../assets/data/images';


@Component({
  selector: 'public-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class PublicFooterComponent {
  public readonly currentYear: number = DatetimeHelper.currentYear;
  public mainLogo: string = Images.devSkillLogo;
}
