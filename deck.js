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

function randInt(_min, _max) {
    var min = _min || 1,
        max = _max || 2
    return (Math.round(Math.random() * Math.pow(10, Math.ceil(Math.log(max)/Math.LN10) + 2)) % (max + 1 - min) + min)
}

$$(document).ready(function() {
    var generate_number = function() {
        var d1 = randInt(1, 3),
            d2 = randInt(1, 3),
            d3 = randInt(1, 3),
            d4 = randInt(1, 3),
            nr = (d1 + d2 + d3 + d4) - 8
        return (nr<0?"-":(nr===0?"":"+")) + ""+Math.abs(nr)
    },
    generate_card = function() {
        var card = {'nr': generate_number(),
                    'moon': randInt() == 1}
        console.log(card)
        return card
    },
    draw_moon = function(parent) {
        var canvas = parent.find('canvas')[0],
            width = parent.width(),
            height = parent.height(),
            ctx = canvas.getContext('2d'),
            ratio = height/width
        canvas.width = width
        canvas.height = height
        var x1 = width/2, y1 = height/2, r1=width/2,
            x2 = width*3/9, y2 = height/2, r2=width*4/9
        var i = intersection(x1, y1, r1, x2, y2, r2),
            a1 = angle_to(x1, y1, i[0], i[2]),
            a2 = angle_to(x2, y2, i[0], i[2])
        ctx.beginPath()
        ctx.arc(x1, y1, r1, -(Math.PI-a1), Math.PI-a1)
        ctx.arc(x2, y2, r2, Math.PI-a2, -(Math.PI-a2), true)
        ctx.closePath()
        ctx.fill()
    },
    update_card = function(card) {
        $$('.card .number').html(card['nr'])
        if (card['moon']) {
            $$('.card .moon').removeClass('hidden')
        } else {
            $$('.card .moon').addClass('hidden')
        }
    }

    console.log("Ready")
    $$('.card').on('tap', function() { update_card(generate_card()) })
    draw_moon($$('.card .moon'))
    update_card(generate_card())
});
