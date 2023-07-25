<template>
    <div>
        <input type="file" @change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <input type="file" @change="readFile2" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <button style="margin-right:50px;" v-on:click="cehckfile">미발송업체 찾기</button>
        <button style="margin-right:50px;" v-on:click="checkfile2">날짜 추가</button>
        <input style="margin-right:50px;" type="file" @change="readFile3"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
    </div>
    <hr>



    <ul style="width:30%; float:left; margin-right:5%">
        <li style="background-color: black; color:white; font-weight: bold;">발송업체({{ this.data2.length }})개</li>
        <li v-for=" item in this.data2">{{ item }}</li>
    </ul>

    <ul style="width:30%; float:left; ">
        <li style="background-color: black; color:white; font-weight: bold;">발송되지 않은 업체 ({{ this.dataArray.length }})개
            <button @click="exportToExcel">엑셀 다운</button>
        </li>
        <li v-for="item in this.dataArray">{{ item }}</li>
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
        checkfile2() {
            const data1 = ref([
                [45111, '~', 45141, '의료법인 식산의료재단 나사렛요양병원'],
                [45111, '~', 45142, '김해시도시개발공사'],
                [45111, '~', 45124, '창원한마음병원'],
                [45111, '~', 45132, '의료법인 정화의료재단 봉생힐링병원'],
                [45111, '~', 45141, '사회복지법인신일어린이집(경북경산)'],
                [45111, '~', 45141, '이든어린이집(경북경주)'],
                [45111, '~', 45141, '테스트기업'],
            ]);

            const data2 = ref([
                ['의료법인 식산의료재단 나사렛요양병원'],
                ['김해시도시개발공사'],
                ['창원한마음병원'],
                ['의료법인 정화의료재단 봉생힐링병원'],
                ['사회복지법인신일어린이집(경북경산)'],
                ['이든어린이집(경북경주)'],
            ]);

            // data2의 텍스트가 data1에 있는 경우, 해당 항목들의 나머지 부분을 data1에 추가합니다.
            const data3 = data1.value.filter((item1) =>
                data2.value.some((item2) => item2[0] === item1[3])
            );
            console.log(data2);
            console.log(data1);
            console.log(data3);
        },

        exportToExcel() {
            const dataArrayInColumns = this.dataArray.map(item => [item]);
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
            worksheet['!cols'] = [{ width: 30 }];

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

            const uniqueArray1 = this.data2.filter((value) => !this.data4.includes(value));
            const uniqueArray2 = this.data4.filter((value) => !this.data2.includes(value));
            const finalUniqueArray = [...uniqueArray1, ...uniqueArray2];
            console.log(finalUniqueArray);
            this.backup = finalUniqueArray.filter((itemA) => !this.data4.includes(itemA));
            console.log(this.backup);
            this.checkarray = finalUniqueArray.toString();
            console.log(this.checkarray);
            console.log(this.checkarray.split(','));
            this.dataArray = this.checkarray.split(',');
            this.dataArray = this.backup;



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

                this.data = this.result.toString();
                console.log(this.data.split(','));
                this.data2 = this.data.split(',');
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
        readFile3(event) {
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
                console.log(this.result);
                this.data10 = this.result.toString();
                console.log(this.data10);
                console.log(this.data10.split(','));
                this.data11 = this.data10.split(',');
                console.log(this.data11);
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