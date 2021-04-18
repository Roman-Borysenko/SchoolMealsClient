import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { environment } from 'src/environments/environment';
import { RequestService } from '../services/request.service';

export interface SlidModel {
  title: string,
  description: string,
  buttonName: string,
  buttonLink: string,
  image: string
}

@Component({
  selector: 'app-owl-carousel',
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.css']
})
export class OwlCarouselComponent implements OnInit {

  @ViewChild("OwlCarousel") owlElement: OwlCarousel | undefined;

  SlideOptions = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    dots: true,
    nav: true
  };

  env = environment;
  
  slides: Array<SlidModel> = Array<SlidModel>();

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.get<Array<SlidModel>>("api/slider/getslidestoshow?lang=" + this.env.language).subscribe(res => {
      this.slides = res;
      this.owlElement?.reInit();
    });
  }

}
