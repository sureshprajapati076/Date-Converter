import { Component } from '@angular/core';
import { BSDatesConstants } from './bs_data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  result: String[] = []
  bsDate: String;
  adDate: String;
  lookup = BSDatesConstants.data;
  ad_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  day_ofWeek = ["WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY", "MONDAY", "TUESDAY"];
  validateGivenDateAndConvert(type) {
    this.result = []
    let yy, mm, dd;
    if (type == 'BS') {
      let splitted = this.bsDate.split('/');
      yy = splitted[0];
      mm = splitted[1];
      dd = splitted[2];
      if (this.validateBS(yy, mm, dd))
        this.convert(yy, mm, dd, type);
    } else if (type == 'AD') {
      let splitted = this.adDate.split('/');
      yy = splitted[0];
      mm = splitted[1];
      dd = splitted[2];
      if (this.validateAD(yy, mm, dd))
        this.convert(yy, mm, dd, type);
    }
  }
  validateAD(yy, mm, dd) {
    if (yy < 1943 || yy > 2043 || mm > 12 || mm < 1 || dd < 1 || dd > 31) {
      this.result.push("Invalid Date ( Date Must be between 1943 - 2043 A.D.)");
      return false;
    }
    if (this.leapYear(yy) && mm == 2) {
      if (dd > 28) return false;
    }
    if (dd > this.ad_months[mm - 1]) {
      return false;
    }
    return true;
  }
  validateBS(yy, mm, dd) {
    if (yy < 2000 || yy > 2100 || mm > 12 || mm < 1 || dd < 1 || dd > 32) {
      this.result.push("Invalid Date ( Date Must be between 2000 - 2100 B.S.)");
      return false;
    }
    for (let yearMonthDays of this.lookup) {
      if (yearMonthDays[0] == yy) {
        if (dd > yearMonthDays[mm]) {
          this.result.push("Invalid Day of Month");
          return false;
        } else {
          return true;
        }
      }
    }
  }
  convert(yy, mm, dd, type) {
    let numOfDays = 0;
    let count = 0;
    let leapyear = 0;
    let ad_year = 1943;
    let ad_month = 4;
    let ad_day = 14;
    let bs_year = 2000;
    let bs_month = 1;
    let bs_day = 1;
    do {
      numOfDays++;
      ad_day++;
      bs_day++;
      if (ad_month == 2 && this.leapYear(ad_year)) {
        leapyear = 1;
      } else {
        leapyear = 0;
      }
      if (ad_day > this.ad_months[ad_month - 1] + leapyear) {
        ad_month++;
        if (ad_month > 12) {
          ad_year++;
          ad_month = 1;
        }
        ad_day = 1;
      }
      if (bs_day > this.lookup[count][bs_month]) {
        bs_month++;
        if (bs_month > 12) {
          bs_year++;
          bs_month = 1;
          count++;
        }
        bs_day = 1;
      }
      if (type == 'BS' && bs_year == yy && bs_month == mm && bs_day == dd) {
        this.result.push("BS: " + bs_year + "/" + bs_month + "/" + bs_day)
        this.result.push("AD: " + ad_year + "/" + ad_month + "/" + ad_day)
        this.result.push(this.day_ofWeek[numOfDays % 7])
        break;
      }
      else if (type == 'AD' && ad_year == yy && ad_month == mm && ad_day == dd) {
        this.result.push("AD: " + ad_year + "/" + ad_month + "/" + ad_day)
        this.result.push("BS: " + bs_year + "/" + bs_month + "/" + bs_day)
        this.result.push(this.day_ofWeek[numOfDays % 7])
        break;
      }
    } while (true);
  }
  leapYear(year) {
    if (year % 4 != 0) {
      return false;
    } else if (year % 400 == 0) {
      return true;
    } else if (year % 100 == 0) {
      return false;
    } else {
      return true;
    }
  }
}
