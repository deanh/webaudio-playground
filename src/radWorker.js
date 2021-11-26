self.onmessage = (e) => {
    if (e.data == 'rad') {
        postMessage('dude');
    } else {
        postMessage('bro');
    }
}

postMessage('rad dad initiated.');