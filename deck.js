$$(document).ready(function() {
    var card_clicked = function() {
        var d1 = Math.floor(Math.random() * 100) % 3 + 1,
            d2 = Math.floor(Math.random() * 100) % 3 + 1,
            d3 = Math.floor(Math.random() * 100) % 3 + 1,
            d4 = Math.floor(Math.random() * 100) % 3 + 1,
            nr = (d1 + d2 + d3 + d4) - 8
        $$('.card .number').html((nr<0?"-":"+") + ""+Math.abs(nr))
    }

    console.log("Ready")
    $$('.card').on('tap', card_clicked)
    card_clicked()
});
