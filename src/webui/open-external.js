const { app, shell } = require('electron')

module.exports = function () {
  app.on('web-contents-created', (_, contents) => {
    let linkOpened = false; // Initialize a flag to track whether the link has been opened

    contents.on('will-navigate', (event, url) => {
      const parsedUrl = new URL(url)

      if (parsedUrl.origin !== 'webui://-') {
        event.preventDefault();

        // Check if the link has already been opened
        if (!linkOpened) {
          shell.openExternal(url);
          linkOpened = true; // Set the flag to true
        }
      }
    })

    contents.on('new-window', (event, url) => {
      event.preventDefault();

      // Check if the link has already been opened
      if (!linkOpened) {
        shell.openExternal(url);
        linkOpened = true; // Set the flag to true
      }
    })
  })
}
