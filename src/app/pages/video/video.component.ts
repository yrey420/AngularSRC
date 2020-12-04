import { Component, OnInit } from '@angular/core';
import {YouTubePlayer} from '@angular/youtube-player';
import { getLocaleId } from '@angular/common';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  

  constructor(public youtP:YouTubePlayer) { }

  ngOnInit() {

      }

}
