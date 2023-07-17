<template>
  <div>
    <div class="table_top" style="width:100%; ">
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
            <td> <img class="image_padding" style="width:40px;" src="../src/assets/image/768031.png"></td>
          </tr>
        </tbody>
      </div>
      <div class="table_bottom" style="margin:20px auto; width:100%; height: 60px;">
        <div id="menu" class="tb_center">

          <ul class="menu">
            <li>전체보기

              <ul>
                <li>a</li>
                <li>b</li>
                <li>c</li>
              </ul>
            </li>
            <li>전체보기
              <ul>
                <li>a</li>
                <li>b</li>
                <li>c</li>
              </ul>
            </li>
            <li>전체보기
              <ul>
                <li>a</li>
                <li>b</li>
                <li>c</li>
              </ul>
            </li>
            <li>전체보기
              <ul>
                <li>a</li>
                <li>b</li>
                <li>c</li>
              </ul>
            </li>
            <li>전체보기
              <ul>
                <li>a</li>
                <li>b</li>
                <li>c</li>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </div>





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