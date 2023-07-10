<template>
  <div>
    <div class="table_top">
      <tbody>
        <tr>
          <td><router-link to="/"><img style="width:70px;" src="../src/assets/image/logo.png"></router-link></td>
          <td>
            <fieldset style="border:0;">
              <legend></legend>
              <input class="search" type="text">
            </fieldset>
          </td>
        </tr>
      </tbody>
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

.search {
  border-style: none;
  border-bottom: solid 1px #cacaca;
  border-collapse: collapse;
}
</style>