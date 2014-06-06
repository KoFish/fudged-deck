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
        return nr
    },
    number_sign = function(nr) {
        return (nr<0?"-":(nr===0?"":"+")) + ""+Math.abs(nr)
    }
    generate_ladder_text = function(_nr) {
        var nr = _nr !== undefined ? _nr : generate_number(),
            texts = ['Terrible',
                     'Poor',
                     'Mediocre',
                     'Average',
                     'Fair',
                     'Good',
                     'Great',
                     'Superb',
                     'Fantastic',
                     'Epic',
                     'Legendary']
        console.log(_nr, nr, texts[nr])
        if (nr >= -2 && nr <= +8) { return texts[nr + 2] }
        else { return '' }
    }
    draw_moon = function(parent) {
        var canvas = parent.find('canvas')[0],
            width = parent.width(),
            height = parent.height(),
            ctx = canvas.getContext('2d')
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
    draw_background_1 = function(parent) {
        var canvas = parent.find('canvas')[0],
            width = parent.width(),
            height = parent.height(),
            ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(width, height)
        ctx.stroke()
    },
    draw_background_2 = function(parent) {
        var canvas = parent.find('canvas')[0],
            width = parent.width(),
            height = parent.height(),
            ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height
        ctx.beginPath()
        ctx.moveTo(0, height)
        ctx.lineTo(width, 0)
        ctx.stroke()
    },
    update_card = function(card) {
        var bkg = card['background']
        $$('.card .number').html(card['nr'])
        $$('.ladder-text').html(card['ladder_text'])
        if (card['moon']) { $$('.card .moon').removeClass('hidden') }
        else { $$('.card .moon').addClass('hidden') }
        if (bkg <= 0) { $$('#background-1').addClass('hidden') }
        if (bkg <= 1) { $$('#background-2').addClass('hidden') }
        if (bkg >= 1) { $$('#background-1').removeClass('hidden') }
        if (bkg >= 2) { $$('#background-2').removeClass('hidden') }
    },
    generate_card = function() {
        var nr = generate_number(),
            ladder_text = generate_ladder_text(nr),
            moon = randInt() == 1,
            background = randInt(1, 10) == 10 ? (randInt() == 2 ? (randInt() == 2 ? 2 : 1) : 1) : 0,
            card = {'nr': number_sign(nr),
                    'ladder_text': ladder_text,
                    'moon': moon,
                    'background': background}
        console.log(card)
        return card
    },
    redraw = function() {
        draw_moon($$('.card .moon'))
        draw_background_1($$('#background-1'))
        draw_background_2($$('#background-2'))
    }

    $$(window).on('resize', redraw)
    $$('.card').tap(function() { update_card(generate_card()) })
    redraw()
    update_card(generate_card())
});
