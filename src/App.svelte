<script>
  const { ipcRenderer } = require("electron");
  const { mouse, Button } = require("@nut-tree/nut-js");

  let speed = 200;
  mouse.config.autoDelayMs = 100;
  let autoClickActive = false;
  let interval = null;

  const autoClickOptions = ["F1", "CommandOrControl+F1"];

  const handleChange = (e) => {
    ipcRenderer.send("command", e.target.value);
    console.log(e.target.value);
  };

  ipcRenderer.on("triggerCommand", () => {
    autoClickActive = !autoClickActive;

    if (autoClickActive) {
      interval = setInterval(() => {
        mouse.leftClick();
      }, speed);
    } else {
      clearInterval(interval);
    }
  });
</script>

<main>
  <header class="header">
    <h1 class="test__title">Configuration</h1>
    <span>{autoClickActive ? "⚠️active" : ""}</span>
  </header>

  <div class="action-container">
    <div class="row1">
      <label for="trigger">Trigger key:</label>
      <select name="trigger key" id="trigger" on:change={handleChange}>
        {#each autoClickOptions as option}
          <option value={option}>{option}</option>
        {/each}
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

  .header {
    display: flex;
    justify-content: space-between;
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
