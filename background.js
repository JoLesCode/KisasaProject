const canvas = document.getElementById("mycanvas");
const gl = canvas.getContext(`webgl`);

vert2 = `
attribute vec3 position;
uniform mat4 transformation;
attribute vec3 color;
varying vec3 Vcolor;


void main(){
    gl_PointSize = 1.0;
    gl_Position = transformation*vec4(position,1);
    Vcolor = vec3(1,color.xy);
}
`;

frag2 = `
precision mediump float;
varying vec3 Vcolor;

void main(){
    gl_FragColor = vec4(Vcolor,1);
}
`;

 let points2 = [];
 let colors2 = [];

for(var i = 0; i<5000; i++){
    x = Math.random() - 0.5;
    y = Math.random() - 0.5;
    z = Math.random() - 0.5;

    colors2.push(0);
    colors2.push(3);
    colors2.push(6);

    points2.push(x/Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2)));
    points2.push(y/Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2)));
    points2.push(z/Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2)));
}

buffer2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points2), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

colorbuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorbuffer2);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors2), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

vertShader2 = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader2, vert2);
gl.compileShader(vertShader2);

if (!gl.getShaderParameter(vertShader2, gl.COMPILE_STATUS)) {
    console.error("Error compiling fragment Shader", gl.getShaderInfoLog(vertShader2));
}

fragShader2 = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader2, frag2);
gl.compileShader(fragShader2);

if (!gl.getShaderParameter(fragShader2, gl.COMPILE_STATUS)) {
    console.error("Error compiling fragment Shader", gl.getShaderInfoLog(fragShader2));
}

program2 = gl.createProgram();
gl.attachShader(program2, vertShader2);
gl.attachShader(program2, fragShader2);
gl.linkProgram(program2);
gl.useProgram(program2);
gl.enable(gl.DEPTH_TEST);

gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
posLoc2 = gl.getAttribLocation(program2, 'position');
gl.vertexAttribPointer(posLoc2, 3, gl.FLOAT, false,0,0);
gl.enableVertexAttribArray(posLoc2);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

gl.bindBuffer(gl.ARRAY_BUFFER, colorbuffer2);
colorLoc2 = gl.getAttribLocation(program2, 'color');
gl.vertexAttribPointer(colorLoc2, 3, gl.FLOAT, false,0,0);
gl.enableVertexAttribArray(colorLoc2);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

trans = [1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1];
//gl.uniformMatrix4fv(gl.getUniformLocation(program2, 'trans'),false,trans);

draw2();

function draw2(){
    
    
   rotateY(trans,trans,0.001);
    gl.uniformMatrix4fv(gl.getUniformLocation(program2, 'transformation'),false,trans);
    gl.drawArrays(gl.POINTS,0, points2.length);
    window.requestAnimationFrame(draw2);

}

function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }