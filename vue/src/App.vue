<template>
  <div>
    <div class="table_top" style="width:100%;">
      <div class="table_center" style="margin:0 auto; width:30%; padding-top:30px;">
        <tbody>
          <tr>
            <td><router-link to="/"><img style="width:70px;" src="../src/assets/image/logo.png"></router-link></td>
            <td>
              <fieldset style="border:0;">
                <legend></legend>
                <input class="search" type="text">
              </fieldset>
            </td>
            <td>서치 아이콘</td>
          </tr>
        </tbody>
      </div>
      <div class="table_bottom" style="margin:20px auto; width:100%; height: 60px;">
        <tbody style="vertical-align: middle;">
          <tr>
            <td>전체보기</td>
            <td><router-link to="/">상의</router-link></td>
            <td><router-link to="/">상의</router-link></td>
            <td><router-link to="/">상의</router-link></td>
            <td><router-link to="/">상의</router-link></td>
            <td><router-link to="/">상의</router-link></td>
          </tr>
        </tbody>
      </div>
    </div>



    <hr />

    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
@import "../src/assets/css/menu_table.css";
</style>