import { Component, EventEmitter, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { FileUploader } from 'ng2-file-upload';
import { ConstatService } from '../../list-constat/constat.service';
import { PagesComponent } from '../../pages.component';
const URL = 'http://localhost:3000/fileupload/';
@Component({
  selector: 'ngx-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  retrievedImageName: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  res: any;
  source: any
  A: string
  public imagePath;
  imgURL: any;
  url = PagesComponent.urlConfig

  constructor(private constatService: ConstatService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.retrievedImage = this.url + "downloadFile\\None.gif";
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.retrievedImage = reader.result;
      this.retrievedImageName = event.target.files[0].name;
    }
  }

  onSave()
  { let idC = localStorage.getItem("ccId")
    this.onUpload(+idC)
    this.windowRef.close();
    this.toastrService.success("Succès", "image enregistrée");}


  async onUpload(id: number) {
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    await this.constatService.uploadimage(id, uploadImageData);

  }

  async getImage(id: number) {
    this.res = await this.constatService.getimage(id);
    this.retrieveResonse = this.res;
    this.retrievedImageName = this.res.name;
    this.base64Data = this.retrieveResonse.picByte;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }
}
