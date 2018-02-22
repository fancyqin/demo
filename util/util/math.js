const math = {
    
    //弧度转角度
    rad2angle: rad => 180 / Math.PI * Number(rad.toString().replace('/\D/g','')),
    
    //角度转弧度
    angle2rad: angle => Math.PI / 180 * Number(angle.toString().replace('/\D/g','')),

    
    
}