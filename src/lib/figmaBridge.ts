export function send(type: string, payload?: any) {
  parent.postMessage({ pluginMessage: { type, payload } }, '*');
}

export function onMessage(cb: (msg: any) => void) {
  window.addEventListener('message', (event) => {
    const message = event.data.pluginMessage;
    if (message) cb(message);
  });
}
