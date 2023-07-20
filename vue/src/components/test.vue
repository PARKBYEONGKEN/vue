<template>
    <div>
        <input type="file" @change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
    </div>
    <hr>
    <table>
        <thead>
            <tr>
                발송업체
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in this.data">{{ item }}</tr>
        </tbody>
    </table>
</template>

<script>

import * as XLSX from 'xlsx'

export default {
    components: {


    },
    data() {
        return {
            data: [],



        };
    },
    methods: {
        readFile(event) {
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
                for (var i = 0 < this.result.length; i++ ) { }



            };
            reader.readAsArrayBuffer(file);

        }


    }
}





</script>

<style lang="css" scoped></style>