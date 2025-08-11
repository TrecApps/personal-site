import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatchTracker } from '../../../models/match-tracker';

@Component({
  selector: 'app-trooper-match',
  imports: [CommonModule],
  templateUrl: './trooper-match.component.html',
  styleUrl: './trooper-match.component.css'
})
export class TrooperMatchComponent {
  picIndex: String[];

  arrays: any[];
  picIndex2: String[];
  picIndexHolder: String[];
  counter: number;

  resp: boolean;
  showTable:boolean;
  showMessage: boolean;

  doubleImageIndex: MatchTracker[][];

  // Selections
  selectedImg: any;

  constructor() { 
    this.picIndex = [
      '076.jpg',
      '078.jpg',
      '079.jpg',
      '080.jpg',
      'WP_20150107_005.jpg'
    ];

    this.arrays = [];
    this.picIndex2 = [];
    this.picIndexHolder = [];
    this.counter = 0;
    this.resp = true;
    this.showTable = this.showMessage = false;
    this.selectedImg = null;
    this.doubleImageIndex = [];
    this.refreshTable();
  }

  refreshTable() {

    
    for(let c = 0; c < 2; c++){
      let column = [];
      for(let r = 0; r < 5; r++) {
        let m = new MatchTracker();
        m.img = 'assets/trooper/holder.png';
        column.push(m);
      }
      this.doubleImageIndex.push(column);
    }
  }

  ngOnInit(): void {
  }

  deleteElement(arr:any[], ind:number) {
    if(ind >= 0 && ind < arr.length) {
        let temp = arr[arr.length - 1];
        arr[arr.length -1] = arr[ind];
        arr[ind] = temp;
        arr.pop();
    }
  }

  generateGame() {
    this.doubleImageIndex = [];
    this.refreshTable();
    this.counter = 0;
    this.showTable = this.showMessage = false;

    this.picIndex2 = [];
    this.picIndexHolder = [];
    this.arrays = [];

    for(let c = 0; c < 5; c++) {
      let rand = Math.floor(Math.random() * 100) % this.picIndex.length;

      this.picIndexHolder.push(this.picIndex[rand]);
      this.picIndexHolder.push(this.picIndex[rand]);

      this.picIndex2.push(this.picIndex[rand]);
      this.deleteElement(this.picIndex, rand);
    }

    this.picIndex = this.picIndex2;
    this.picIndex2 = [];

    for(let c = 0; c < 5; c++) {

      var arrayE1 = [];
      for(let rust = 0; rust < 2; rust++) {
          let rand = Math.floor(Math.random() * 100)  % this.picIndexHolder.length;
          arrayE1.push({img :this.picIndexHolder[rand], stat: 0});
          this.deleteElement(this.picIndexHolder, rand);
      }

      this.arrays.push(arrayE1);
    }
    this.showTable = true;
  }

  onSelect(n: String) {
    if (!this.resp) {
      return;
    }

    let nums = n.split(':');
            let row = Number.parseInt(nums[1]);
            let col = Number.parseInt(nums[0]);

            let selElement = this.arrays[row][col];
            if(selElement.stat > 0) {
              return;
            }

            if(selElement.stat == 0) {
                selElement.stat = 1;
            }
            
            
            
            this.counter++;

            this.doubleImageIndex[col][row].img = `assets/trooper/${selElement.img}`;

            if(this.selectedImg) {

                let selectedImg2 = {col,row};

                if(this.doubleImageIndex[this.selectedImg.col][this.selectedImg.row].img == this.doubleImageIndex[selectedImg2.col][selectedImg2.row].img) {
                  this.doubleImageIndex[this.selectedImg.col][this.selectedImg.row].stat = 2;
                  this.doubleImageIndex[selectedImg2.col][selectedImg2.row].stat = 2;
                    this.selectedImg = null;

                    if(this.checkWin()) {
                        this.showMessage = true;
                    }

                } else {
                    this.resp = false;
                    setTimeout( () => {
                      this.doubleImageIndex[this.selectedImg.col][this.selectedImg.row].img = 'assets/trooper/holder.png';
                      this.doubleImageIndex[selectedImg2.col][selectedImg2.row].img = 'assets/trooper/holder.png';

                      this.arrays[this.selectedImg.row][this.selectedImg.col].stat = 0;
                      this.arrays[selectedImg2.row][selectedImg2.col].stat = 0;

                        this.selectedImg = undefined;
                        this.resp = true;
                    }, 2000);
                }
            } else {
                this.selectedImg = {col, row};
            }
  }

  checkWin()
  {
    for(let rust = 0; rust < this.doubleImageIndex.length; rust++) {
      for(let c = 0; c < this.doubleImageIndex[rust].length; c++) {
        if( this.doubleImageIndex[rust][c].stat != 2) {
          return false;
        }
      }
    }
    return true;
  }
}
