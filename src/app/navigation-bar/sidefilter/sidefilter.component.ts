import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidefilter',
  templateUrl: './sidefilter.component.html',
  styleUrls: ['./sidefilter.component.scss']
})
export class SidefilterComponent implements OnInit {

  constructor(config: NgbRatingConfig) { }

  ngOnInit(): void {
  }

  ratingOne = 1;
  ratingTwo = 2;
  ratingThree = 3;
  ratingFour = 4;
  ratingFive = 5;


}
