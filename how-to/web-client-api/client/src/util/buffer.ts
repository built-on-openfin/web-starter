import * as BufferSupport from "buffer/";

if ((window as unknown as { Buffer: typeof BufferSupport.Buffer }).Buffer === undefined) {
	console.log("Buffer global does not exist. Creating a global Buffer object.");
	(window as unknown as { Buffer: typeof BufferSupport.Buffer }).Buffer = BufferSupport.Buffer;
}
