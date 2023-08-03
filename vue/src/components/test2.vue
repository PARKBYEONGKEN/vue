<template>
    <div style="height: 80px; padding-top:10px; padding-left:30px;">

        <input style="float:left; margin-left:240px;" type="file" @change="readFile"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <button style="margin:0px 350px" v-on:click="cehckfile">미발송업체 찾기</button>
        <input style="float:right; margin-right:80px" type="file" @change="readFile2"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <br>
        <br>

        <button style="margin-right:50px;" v-on:click="urlchange">사용법 보기</button>

    </div>
    <hr>



    <ul style="width:30%; float:left; margin-right:5%">
        <li style="background-color: black; color:white; font-weight: bold;">발송업체({{ this.data2.length }})개</li>
        <ul style="width:25%; float: left;">
            <li style="height:50px;" v-for=" item in this.data2">{{ item[0] }}</li>
        </ul>
        <ul style="width:10%; float:left;">
            <li style="height:50px;" v-for=" item2 in this.data2">{{ item2[1] }}</li>
        </ul>
        <ul style="width:25%; float:left;">
            <li style="height:50px;" v-for=" item3 in this.data2">{{ item3[2] }}</li>
        </ul>
        <ul style="width:40%; float:left;">
            <li style="height:50px;" v-for=" item4 in this.data2">{{ item4[3] }}</li>
        </ul>

    </ul>

    <ul style="width:30%; float:left; ">
        <li style="background-color: black; color:white; font-weight: bold;">발송되지 않은 업체 ({{ this.dataArray.length }})개
            <button @click="exportToExcel">엑셀 다운</button>
        </li>
        <li v-for="item in this.dataArray">{{ item[3] }}</li>
    </ul>


    <ul style="width:30%; float:right;">
        <li style="background-color: black; color:white; font-weight: bold;">실제발송({{ this.data4.length }})개</li>
        <li v-for=" item in this.data4">{{ item }}</li>
    </ul>

    <div class="modal" v-if="this.modalnum === 1">
        <button style="width:100%" v-on:click="this.modalnum = 2">닫기</button>
        <hr>
        <h2>첫번째 파일 첨부 설명</h2>

        <p class="pad">1. 현황표에서 진도율을 확인할려는 날짜의 "교육개강", "~" , "교육종강" , "업체명" 셀의 데이터만을 복사<br>
        </p>

        <img src="../assets/image/hun1.png" style="height:65%">
        <p class="pad">2. 엑셀 빈파일을 열어 복사했던 데이터를 A1번셀 부터 붙여넣기 진행</p>

        <img src="../assets/image/hun2.png" style="height:70%">
        <p class="pad">3. 해당 파일을 저장 ( 해당 파일은 첫번째 파일첨부에 들어갈 파일) </p>

        <img src="../assets/image/hun3.png" style="height:20%">
        <hr>
        <h2>두번째 파일 첨부 설명</h2>
        <p class="pad">1. LMS에서 사이트관리 > 진도율 발송목록에서 당일날짜 입력후 검색 클릭 => 다운로드 버튼 클릭시 엑셀 다운로드됨<br>
        </p>

        <img src="../assets/image/jin1.png" style="height:65%">
        <p class="pad">2. 다운받은 엑셀파일에서 사업주 업체명만 나올수있게 B2셀 데이터만 복사 </p>

        <img src="../assets/image/jin2.png" style="height:70%">
        <p class="pad">3. 엑셀 빈파일을 열어 복사했던 데이터를 A1번셀 부터 붙여넣기 진행 </p>

        <img src="../assets/image/jin3.png" style="height:70%">

        <p class="pad">4. 해당 파일을 저장 ( 해당 파일은 두번째 파일첨부에 들어갈 파일) </p>

        <img src="../assets/image/jin4.png" style="height:20%">
        <hr>
        <h2>파일 첨부후 설명</h2>
        <p class="pad">1. 파일 2개를 모두 첨부 완료시 아래와 같이 첨부했던 파일의 목록이 나타남 </p>
        <img src="../assets/image/chum1.png" style="height:50%">

        <p class="pad">2. 목록이 두개다 정상적으로 출력시 "미발송업체 찾기" 버튼 클릭 </p>
        <img src="../assets/image/chum2.png" style="height:30%">
    </div>
</template>

<script>

import * as XLSX from 'xlsx'
import { ref } from 'vue';
export default {
    components: {


    },
    data() {
        return {
            data: [],
            data2: [],
            data3: [],
            data4: [],
            data10: [],
            data11: [],
            checkarray: [],
            dataArray: [],
            backup: [],
            modalnum: 2,



        };
    },
    methods: {
        urlchange() {
            this.modalnum = 1;
        },

        exportToExcel() {
            const dataArrayInColumns = this.dataArray.map(item => Object.values(item));
            const worksheet = XLSX.utils.aoa_to_sheet(dataArrayInColumns);

            // A1 셀에 스타일 적용
            const cellStyle = {
                fill: {
                    fgColor: { rgb: '000000' }, // 검정색 배경
                },
                font: {
                    color: { rgb: 'FFFFFF' }, // 흰색 글자색
                },
            };
            worksheet['A1'].s = cellStyle;
            worksheet['A1'].t = 's'; // 텍스트로 취급

            // A1 셀의 너비 설정 (예시로 15로 설정)
            const columnWidths = [
                { width: 13 }, // Width for column A
                { width: 4 }, // Width for column B
                { width: 13 }, // Width for column C
                { width: 40 }, // Width for column C
                // Add more objects for additional columns as needed
            ];
            worksheet['!cols'] = columnWidths;



            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            XLSX.writeFile(workbook, 'data.xlsx');
        },


        saveAsExcelFile(buffer, fileName) {
            const data = new Blob([buffer], { type: 'application/octet-stream' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(data);
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(a.href);
        },

        cehckfile() {
            console.log(this.data2)
            console.log(this.data4)
            this.dataArray = this.data2.filter(item => !this.data4.some(str => item.includes(str)));
            console.log(this.dataArray);
            // const uniqueArray1 = this.data2.filter((value) => !this.data4.includes(value));
            // const uniqueArray2 = this.data4.filter((value) => !this.data2.includes(value));
            // const finalUniqueArray = [...uniqueArray1, ...uniqueArray2];
            // console.log(finalUniqueArray);
            // this.backup = finalUniqueArray.filter((itemA) => !this.data4.includes(itemA));
            // console.log(this.backup);

            // this.checkarray = finalUniqueArray.toString();
            // console.log(this.checkarray);
            // console.log(this.checkarray.split(','));
            // this.dataArray = this.checkarray.split(',');
            // console.log(this.dataArray);
            // this.dataArray = this.backup;



        },
        // 날짜를 yyyy-mm-dd 형태로 변환하는 함수
        formatDate(date) {
            if (!(date instanceof Date)) {
                return date; // 날짜 객체가 아니면 그대로 반환
            }

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },
        readFile(event) {
            const file = event.target.files[0];
            const fileName = file.name;
            const reader = new FileReader();
            let tmpResult = [];

            reader.onload = (e) => {
                let data = e.target.result;
                data = new Uint8Array(data);
                let excelFile = XLSX.read(data, { type: "array", cellDates: true, dateNF: "dd.mm.yyyy" });

                excelFile.SheetNames.forEach((sheetName) => {
                    const roa = XLSX.utils.sheet_to_json(excelFile.Sheets[sheetName], { header: 1 });
                    if (roa.length) tmpResult[sheetName] = roa;
                });

                // 날짜 형식 변경하여 this.result에 저장 (날짜 + 1일)
                this.result = tmpResult.Sheet1.map((row) =>
                    row.map((cell) => {
                        if (cell instanceof Date) {
                            const updatedDate = new Date(cell.getTime() + 24 * 60 * 60 * 1000);
                            return this.formatDate(updatedDate);
                        }
                        return cell;
                    })
                );
                this.data2 = this.result;
                console.log(this.result);
                // this.data = this.result.toString();
                // console.log(this.data.split(','));
                // this.data2 = this.data.split(',');
            };

            reader.readAsArrayBuffer(file);
        },


        readFile2(event) {
            // get File object from input tag
            const file = event.target.files[0];
            const fileName = file.name;

            // declare FileReader, temp result
            const reader = new FileReader();
            let tmpResult = [];

            // if you use "this", don't use "function(e) {...}"
            reader.onload = (e) => {
                let data = e.target.result;
                data = new Uint8Array(data);
                // get excel file
                let excelFile = XLSX.read(data, { type: "array" });

                // get prased object
                excelFile.SheetNames.forEach(function (sheetName) {
                    const roa = XLSX.utils.sheet_to_json(
                        excelFile.Sheets[sheetName],
                        { header: 1 }
                    );
                    if (roa.length) tmpResult[sheetName] = roa;
                });
                this.result = tmpResult.Sheet1;
                console.log(this.result);
                console.log(this.result.length);

                this.data3 = this.result.toString()
                console.log(this.data3.split(','));
                this.data4 = this.data3.split(',');






            };
            reader.readAsArrayBuffer(file);

        },



    }
}





</script>

<style lang="css" scoped>
li {
    border: 1px solid #444444;
    text-align: center;

}

.modal {
    width: 95vw;
    height: 70vh;
    overflow: scroll;
    position: relative;
    top: 50px;
    left: 20px;
    display: block;
    border: 1px solid #ccc;
    text-align: center;
}

.pad {
    padding: 20px 0px;
    font-weight: bold;
}
</style>