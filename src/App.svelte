<script>
  const { ipcRenderer } = require("electron");
  let speed = 50;
  let bool = true;

  ipcRenderer.on("triggerCommand", () => {
    bool = !bool;
    console.log(bool);
  });
</script>

<main>
  <h1 class="test__title">Configuration</h1>
  <div class="action-container">
    <div class="row1">
      <label for="trigger">Trigger key:</label>
      <select name="trigger key" id="trigger">
        <option value="F12">F12</option>
      </select>
    </div>
    <div class="row2">
      <label for="speed"> Speed (ms): </label>
      <input type="number" name="speed" id="speed" bind:value={speed} />
    </div>
  </div>
</main>

<style lang="scss">
  $green: #588157;
  $dark-green: #344e41;

  @font-face {
    font-family: Rubik;
    src: url("../fonts/Rubik.ttf");
  }

  main {
    box-sizing: border-box;
    font-family: Rubik;
    width: 100%;
    height: 100%;
    padding: 5px;

    display: flex;
    flex-direction: column;
  }

  .action-container {
    color: $green;
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    > .row1 {
      grid-area: 1 / 1 / 2 / 6;

      > select {
        width: 77px;
        border: 2px solid $green;
        border-radius: 4px;
        outline: none;

        &:focus {
          border: 2px solid $dark-green;
        }
      }
    }
    > .row2 {
      grid-area: 2 / 1 / 3 / 3;

      > input {
        width: 73px;
        border: 2px solid $green;
        border-radius: 4px;
        outline: none;

        &:focus {
          border: 2px solid $dark-green;
        }
      }
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  h1 {
    color: $dark-green;
    font-size: 18px;
  }

  * {
    margin: 0;
    padding: 0;
  }
</style>
