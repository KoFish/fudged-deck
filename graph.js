function intersection(x0, y0, r0, x1, y1, r1) {
    var a, dx, dy, d, h, rx, ry, x2, y2
    dx = x1 - x0
    dy = y1 - y0
    d = Math.sqrt((dy*dy) + (dx*dx))
    if (d > (r0 + r1)) { return false }
    if (d < Math.abs(r0 - r1)) { return false }
    a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d)
    x2 = x0 + (dx * a/d)
    y2 = y0 + (dy * a/d)
    h = Math.sqrt((r0*r0) - (a*a))
    rx = -dy * (h/d)
    ry = dx * (h/d)
    var xi = x2 + rx,
        xi_prime = x2 - rx,
        yi = y2 + ry,
        yi_prime = y2 - ry
    return [xi, xi_prime, yi, yi_prime]
}

function angle_to(x1, y1, x2, y2) {
    return Math.atan2(y1 - y2, x1 - x2)
}
