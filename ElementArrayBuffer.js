function ArrayBuffer (bufferContent) {
    this.length = bufferContent.length;

    this.buffer = function () {
        var buffer = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER , new Uint16Array ( bufferContent ), gl.STATIC_DRAW ) ;

        return buffer;
    }
}

/**
 * binds the buffer to the GL environment.
 */
ArrayBuffer.prototype.bind = function () {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
};
