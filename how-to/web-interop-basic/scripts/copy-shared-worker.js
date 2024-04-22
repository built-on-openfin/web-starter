const fs = require('fs');
const path = require('path');

const sharedWorkerPath = `${path.dirname(require.resolve('@openfin/web-interop'))}/shared-worker.js`;

const targetSharedWorkerPath = path.resolve(__dirname, '..', 'public', 'js', 'shared-worker.bundle.js');

fs.copyFile(sharedWorkerPath, targetSharedWorkerPath, (err) => {
	if (err) {
		throw err;
	}
	console.log('shared-worker.js was copied to target directory');
});
