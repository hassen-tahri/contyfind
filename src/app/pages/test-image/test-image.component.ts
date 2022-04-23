import { Component, OnInit } from '@angular/core';
import { ConstatService } from '../list-constat/constat.service';

@Component({
  selector: 'ngx-test-image',
  templateUrl: './test-image.component.html',
  styleUrls: ['./test-image.component.scss']
})
export class TestImageComponent implements OnInit {
  retrievedImage: any;
  retrievedImageList = []
  retrievedImageName: any;
  base64Data: any;
  retrieveResonse: any;
  res: any;
  resList: any
  constructor(private constatService: ConstatService) { }

 async ngOnInit() {
    this.resList = await this.constatService.getimages(45);
    for (let index = 0; index < this.resList.length; index++) {
      this.res = this.resList[index];
      this.retrieveResonse = this.res;
      this.base64Data = this.retrieveResonse.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      console.log(this.retrievedImage)
      this.retrievedImageList.push(this.retrievedImage)
    }


  }

}
