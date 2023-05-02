import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private history: string[] = []

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      const lastElement = this.history[this.history.length - 1];
      if (event instanceof NavigationEnd
        && event.url !== '/'
        && event.urlAfterRedirects !== lastElement
      ) {
        this.history.push(event.urlAfterRedirects)
      }
    })
  }

  back(): void {
    this.history.pop()
    if (this.history.length > 0) {
      const prevElement = this.history.pop();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigateByUrl(prevElement);
      });
      //this.location.back()
    } else {
      this.router.navigateByUrl('/')
    }
  }
}
