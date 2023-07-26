<template>
    <div>
        <input type="file" @change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <input type="file" @change="readFile2" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <button style="margin-right:50px;" v-on:click="cehckfile">미발송업체 찾기</button>

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



        };
    },
    methods: {


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

                // 날짜 형식 변경하여 this.result에 저장
                this.result = tmpResult.Sheet1.map((row) =>
                    row.map((cell) => (cell instanceof Date ? this.formatDate(cell) : cell))
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
</style>