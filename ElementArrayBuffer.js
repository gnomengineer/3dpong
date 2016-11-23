function ElementArrayBuffer (bufferContent) {
    this.length = bufferContent.length;

    this.buffer = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER , new Uint16Array ( bufferContent ), gl.STATIC_DRAW ) ;

}

/**
 * binds the buffer to the GL environment.
 */
ElementArrayBuffer.prototype.bind = function () {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
};
