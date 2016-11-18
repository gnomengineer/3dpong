function ArrayBuffer (bufferContent) {
    this.length = bufferContent.length;

    this.buffer = function () {
        var buffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferContent),gl.STATIC_DRAW);

        return buffer;
    }
}

/**
 * binds the buffer to the GL environment.
 */
ArrayBuffer.prototype.bind = function () {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
};
