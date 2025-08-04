import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private isScrolledSubject = new BehaviorSubject<boolean>(false);
  isScrolled$ = this.isScrolledSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.initScrollListener();
  }

  private initScrollListener(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        this.ngZone.run(() => {
          this.isScrolledSubject.next(isScrolled);
        });
      });
    });
  }

  get isScrolled(): boolean {
    return this.isScrolledSubject.value;
  }
} 