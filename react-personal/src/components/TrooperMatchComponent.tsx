import React from "react";
import { Container } from "react-bootstrap";
import styles from "./component.module.css";
import {Button} from 'react-bootstrap';


// Images
import imgDefault from "../assets/trooper/holder.png";
import img1 from "../assets/trooper/WP_20150107_005.jpg";
import img2 from "../assets/trooper/076.jpg";
import img3 from "../assets/trooper/078.jpg";
import img4 from "../assets/trooper/079.jpg";
import img5 from "../assets/trooper/080.jpg";




export default function TrooperMatchComponent() {

    let startDImageIndex: { img: string; stat: number; }[][] = [];
    let startArray: {
        img: string;
        stat: number;
    }[][] = [];

    let startSelection: {col: number, row: number } = {col:-1,row:-1};

    const [showTable, setShowTable] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [resp, setResp] = React.useState(true);

    const [doubleImageIndex, setDoubleImageIndex] = React.useState(startDImageIndex);
    const [picIndex, setPicIndex] = React.useState([
        img1,
        img2,
        img3,
        img4,
        img5
    ]);
    
    const [arrays, setArrays] = React.useState(startArray);
    
    const [counter, setCounter] = React.useState(0);

    const [selectedImg, setSelectedImg] = React.useState(startSelection);

    function checkWin()
    {
      for(let rust = 0; rust < doubleImageIndex.length; rust++) {
        for(let c = 0; c < doubleImageIndex[rust].length; c++) {
          if( doubleImageIndex[rust][c].stat != 2) {
            return false;
          }
        }
      }
      return true;
    }


    function refreshTable() {
        let tempIndex = [];
        for(let c = 0; c < 2; c++){
            let column = [];
            for(let r = 0; r < 5; r++) {
              let m = {
                img: imgDefault,
                stat: 0
              }
              column.push(m);
            }
            tempIndex.push(column);
        }
        setDoubleImageIndex(tempIndex);
        
    }

    function deleteElement(arr:any[], ind:number) {
        if(ind >= 0 && ind < arr.length) {
            let temp = arr[arr.length - 1];
            arr[arr.length -1] = arr[ind];
            arr[ind] = temp;
            arr.pop();
        }
      }

    function generateGame() {
        refreshTable();

        setCounter(0);
        setShowMessage(false);
        //setShowTable(false);

        let picIndex2: string[] = [];

        let picIndexHolder: string[] = [];

        let tempArrays:{
            img: string;
            stat: number;
        }[][] = [];
        setArrays([]);



        for(let c = 0; c < 5; c++) {
            let rand = Math.floor(Math.random() * 100) % picIndex.length;
      
            picIndexHolder.push(picIndex[rand]);
            picIndexHolder.push(picIndex[rand]);
      
            picIndex2.push(picIndex[rand]);
            deleteElement(picIndex, rand);
          }
      
          setPicIndex(picIndex2);
      
          for(let c = 0; c < 5; c++) {
      
            var arrayE1 = [];
            for(let rust = 0; rust < 2; rust++) {
                let rand = Math.floor(Math.random() * 100)  % picIndexHolder.length;
                arrayE1.push({img :picIndexHolder[rand], stat: 0});
                deleteElement(picIndexHolder, rand);
            }
      
            tempArrays.push(arrayE1);
          }
          setArrays(tempArrays);
          setShowTable(true);
    }

    function onSelect(col: number, row: number) {
        if (!resp) {
            return;
        }

        let selElement = arrays[row][col];
        if(selElement.stat > 0) {
            return;
        }
      
        if(selElement.stat == 0) {
            selElement.stat = 1;
        }
                  
        setCounter(counter+1);      
                  
      
        doubleImageIndex[col][row].img = selElement.img;
      
        if(selectedImg.col >= 0) {
      
            let selectedImg2 = {col,row};
      
            if(doubleImageIndex[selectedImg.col][selectedImg.row].img == doubleImageIndex[selectedImg2.col][selectedImg2.row].img) {
                doubleImageIndex[selectedImg.col][selectedImg.row].stat = 2;
                doubleImageIndex[selectedImg2.col][selectedImg2.row].stat = 2;
                setSelectedImg({col:-1,row:-1});
      
                if(checkWin()) {
                    setShowMessage(true);
                }
      
            } else {
                setResp(false);
                setTimeout( () => {
                    doubleImageIndex[selectedImg.col][selectedImg.row].img = imgDefault;
                    doubleImageIndex[selectedImg2.col][selectedImg2.row].img = imgDefault;
      
                    arrays[selectedImg.row][selectedImg.col].stat = 0;
                    arrays[selectedImg2.row][selectedImg2.col].stat = 0;
      
                    setSelectedImg({col:-1,row:-1});
                    setResp(true);
                }, 2000);
            }
        } else {
            setSelectedImg({col, row});
        }
    }


    return (
        <Container className={[styles.baseBackground, styles.jShadow].join(' ')} style={{overflowY: "auto"}}>
            <div className={styles.matchCenter}>
                <Button id="gridSubmit" variant="primary" onClick={generateGame} style={{padding: "20px"}}>Generate Game</Button>
            </div>
    <div className={styles.matchCenter}>

        {
            showTable && 

            <table id="game">
            <tr>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[0][0].img} onClick={() => onSelect(0,0)} />
                </td>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[1][0].img} onClick={() => onSelect(1,0)} />
                </td>
            </tr>

            <tr>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[0][1].img} onClick={() => onSelect(0,1)} />
                </td>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[1][1].img} onClick={() => onSelect(1,1)} />
                </td>
            </tr>

            <tr>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[0][2].img} onClick={() => onSelect(0,2)} />
                </td>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[1][2].img} onClick={() => onSelect(1,2)} />
                </td>
            </tr>

            <tr>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[0][3].img} onClick={() => onSelect(0,3)} />
                </td>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[1][3].img} onClick={() => onSelect(1,3)} />
                </td>
            </tr>

            <tr>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[0][4].img} onClick={() => onSelect(0,4)} />
                </td>
                <td>
                    <img width="100" height="100" src={doubleImageIndex[1][4].img} onClick={() => onSelect(1,4)} />
                </td>
            </tr>
        </table>
        }

        
    </div>

        { showMessage &&
        
        <div 
        className={styles.headerPadder}
    >
        <h3 id="message" >Congradulations! You completed this game in {counter} tries!<br/>Press 'Generate Game' to play again!</h3>
    </div>
        }


    
        </Container>
    );
}