import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { GoogleCloudVisionService } from '../../template-pdf/google-cloud-vision.service';

@Component({
  selector: 'ngx-modal-scan',
  templateUrl: './modal-scan.component.html',
  styleUrls: ['./modal-scan.component.scss']
})
export class ModalScanComponent implements OnInit {

  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();



  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  resultScan: string

    // latest snapshot
    public webcamImage: WebcamImage = null;
    public base64Image: string;
    public visionresponse: string;
    public objvisionresponse: string;

  constructor(
    private vision: GoogleCloudVisionService,
    public windowRef: NbWindowRef) { }


  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }


  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }


  public cameraWasSwitched(deviceId: string): void {
   // console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }






  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.base64Image = this.webcamImage.imageAsBase64
    this.vision.getText(this.base64Image).subscribe((result) => {
      this.base64Image = "data:image/jpg;base64," + this.base64Image;
      //console.log(result['responses'][0])
      const texts = result['responses'][0]['fullTextAnnotation']['text']
      //const texts = result['responses'][0]['textAnnotations'];

      // check if text exist
      if (texts === undefined || texts === null) {
        // prompt no data
        this.visionresponse = texts;
        this.resultScan = "rien"
      } else {
        this.resultScan = texts
        this.fermer()
      }

    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
      this.resultScan = "ERROR"
    });

  }

  fermer() {
    this.windowRef.close();
  }

}
