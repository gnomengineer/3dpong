function ArrayBuffer (bufferContent,n) {
    this.contentLength = bufferContent.length;
    this.contentElements = n;

    this.buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferContent),gl.STATIC_DRAW);

}

/**
 * binds the buffer to the GL environment.
 */
ArrayBuffer.prototype.bind = function () {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
};
