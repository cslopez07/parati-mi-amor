document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* ==========================================================
       SPRITES PIXEL (dibujados con letras, cada letra es un color)
       ========================================================== */

    const PALETA = {
        g: "#3f8f2a", G: "#69c247",                 // tallo y hojas
        r: "#b81d24", R: "#e63946", k: "#3a0d10",   // amapola
        y: "#ffd23f", Y: "#f2a900", o: "#b9770e",   // amarillos
        a: "#3ec6ea", A: "#1a8fb5",                 // orquídea azul
        w: "#ffffff", s: "#cfdde5",                 // blancos
        p: "#b36ad9", P: "#8340b3",                 // allium
        t: "#ff9fc5", T: "#e0669a",                 // tulipán rosa
        c: "#6f8ff0", C: "#3f5fc4",                 // aciano
        n: "#6b3d12", N: "#9a5f24",                 // centro del girasol
        q: "#f6a9cb", Q: "#d8407a",                 // pétalos rosas
        h: "#e63946", H: "#ff9aa2", j: "#8f1622",   // corazón
        K: "#231a14", E: "#1b2b44",                 // abeja
        f: "rgba(223, 244, 255, 0.9)"               // alas
    };

    const SPRITES = {
        amapola: [
            "...rrr...",
            "..rRRRr..",
            ".rRRkRRr.",
            ".rRkkkRr.",
            "..rRkRr..",
            "...rrr...",
            "....g....",
            "..G.g....",
            ".GGgg....",
            "....g.G..",
            "....ggG..",
            "....g....",
            "....g...."
        ],
        diente: [
            "..yyyyy..",
            ".yYyyyYy.",
            ".yyoooyy.",
            ".yYoooYy.",
            ".yyyyyyy.",
            "..yYyYy..",
            "....g....",
            "..G.g....",
            ".GGgg....",
            "....gG...",
            "....g....",
            "....g...."
        ],
        tulipan: [
            "..t.t.t..",
            ".ttttttt.",
            ".tTtttTt.",
            "..tTtTt..",
            "...ttt...",
            "....g....",
            "..G.g....",
            ".GGgg....",
            "....g.G..",
            "....ggG..",
            "....g...."
        ],
        orquidea: [
            "...aaa...",
            ".a.awa.a.",
            ".aaawaaa.",
            "..aAwAa..",
            ".aaaAaaa.",
            ".a.aAa.a.",
            "....g....",
            "..G.g....",
            ".GGgg....",
            "....g.G..",
            "....ggG..",
            "....g...."
        ],
        allium: [
            "...ppp...",
            "..pPpPp..",
            ".pPpPpPp.",
            ".pPpppPp.",
            ".pPpPpPp.",
            "..pPpPp..",
            "...ppp...",
            "....g....",
            "....g....",
            "..G.g....",
            ".GGgg....",
            "....g.G..",
            "....ggG..",
            "....g....",
            "....g...."
        ],
        margarita: [
            "...www...",
            ".w.www.w.",
            ".wsyyysw.",
            "wwwyYywww",
            ".wsyyysw.",
            ".w.www.w.",
            "...www...",
            "....g....",
            "..G.g....",
            ".GGgg....",
            "....g.G..",
            "....ggG..",
            "....g...."
        ],
        aciano: [
            "..c...c..",
            ".cCc.cCc.",
            "..cCcCc..",
            "...cCc...",
            "....g....",
            "..G.g....",
            ".GGgg....",
            "....g.G..",
            "....ggG..",
            "....g...."
        ],
        girasol: [
            "....yyy....",
            "..yyyYyyy..",
            ".yyynnnyyy.",
            ".yynNnNnyy.",
            "yyynnNnnyyy",
            ".yynNnNnyy.",
            ".yyynnnyyy.",
            "..yyyYyyy..",
            "....yyy....",
            ".....g.....",
            ".....g.....",
            "..G..g.....",
            ".GGGgg.....",
            ".....g.G...",
            ".....gGG...",
            ".....g.....",
            ".....g.....",
            ".....g.....",
            ".....g....."
        ],
        petalos: [
            "...q.....",
            "..qQq.q..",
            "...q.qQq.",
            ".q....q..",
            "qQq......",
            ".q......."
        ],
        corazon: [
            ".hh.hh.",
            "hHhhhhh",
            "hhhhhhj",
            ".hhhhj.",
            "..hhj..",
            "...j..."
        ],
        abeja: [
            "..ff.ff....",
            "..ffffff...",
            ".yyKyyKyyy.",
            "KyyKyyKyyEy",
            ".yyKyyKyyyy",
            "...K.K.K..."
        ]
    };

    const FLORES_CHICAS = ["amapola", "diente", "tulipan", "orquidea", "margarita", "aciano", "allium"];

    const cache = {};

    function datosSprite(nombre) {
        if (!cache[nombre]) {
            const filas = SPRITES[nombre];
            const alto = filas.length;
            const ancho = filas[0].length;
            const lienzo = document.createElement("canvas");
            lienzo.width = ancho;
            lienzo.height = alto;
            const ctx = lienzo.getContext("2d");
            filas.forEach(function (fila, y) {
                for (let x = 0; x < fila.length; x++) {
                    const color = PALETA[fila[x]];
                    if (color) {
                        ctx.fillStyle = color;
                        ctx.fillRect(x, y, 1, 1);
                    }
                }
            });
            cache[nombre] = { url: lienzo.toDataURL(), ancho: ancho, alto: alto };
        }
        return cache[nombre];
    }

    function crearSprite(nombre, px) {
        const d = datosSprite(nombre);
        const img = new Image();
        img.src = d.url;
        img.width = d.ancho * px;
        img.height = d.alto * px;
        img.alt = "";
        img.draggable = false;
        return img;
    }

    // número aleatorio "con semilla": el prado siempre se ve igual
    function mulberry32(a) {
        return function () {
            a |= 0;
            a = (a + 0x6D2B79F5) | 0;
            let t = Math.imul(a ^ (a >>> 15), 1 | a);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ==========================================================
       PRADO DE FLORES
       ========================================================== */

    const prado = document.getElementById("prado");
    let ultimoAncho = 0;
    let ultimoPx = 0;

    function plantar(nombre, px, izquierda, abajo, rand, conBalanceo) {
        const flor = document.createElement("div");
        flor.className = "flor" + (conBalanceo ? "" : " suelo");
        flor.style.setProperty("--l", Math.round(izquierda) + "px");
        flor.style.setProperty("--b", Math.round(abajo) + "px");
        flor.style.setProperty("--t", (2.6 + rand() * 1.8).toFixed(2) + "s");
        flor.style.setProperty("--d", (-rand() * 4).toFixed(2) + "s");
        flor.appendChild(crearSprite(nombre, px));
        prado.appendChild(flor);
    }

    function elegir(rand, anterior) {
        let i;
        do {
            i = Math.floor(rand() * FLORES_CHICAS.length);
        } while (i === anterior);
        return i;
    }

    function sembrarPrado() {
        if (!prado) return;

        const ancho = window.innerWidth;
        const alto = window.innerHeight;
        const pxPorAncho = ancho < 520 ? 3 : ancho < 1100 ? 4 : ancho < 1800 ? 5 : 6;
        // en pantallas muy bajas (celular de lado) las flores se hacen más chicas
        const px = Math.max(2, Math.min(pxPorAncho, Math.floor(alto / 100)));

        ultimoAncho = ancho;
        ultimoPx = px;
        prado.textContent = "";

        const rand = mulberry32(2026);

        // fila de atrás: más chica, con girasoles altos
        let previa = -1;
        let ultimoGirasol = -99;
        for (let x = -px * 3, n = 0; x < ancho; x += px * (20 + rand() * 8), n++) {
            let nombre;
            if (n - ultimoGirasol > 3 && rand() < 0.18) {
                nombre = "girasol";
                ultimoGirasol = n;
            } else {
                previa = elegir(rand, previa);
                nombre = FLORES_CHICAS[previa];
            }
            plantar(nombre, px, x, px * 3 + rand() * px * 5, rand, true);
        }

        // pétalos rosas tirados en el pasto (como en el bioma de cerezos)
        for (let i = 0, total = Math.ceil(ancho / (px * 32)); i < total; i++) {
            plantar("petalos", px, rand() * (ancho - px * 9), -px + rand() * px * 7, rand, false);
        }

        // fila de adelante: más grande, cortada por el borde de abajo
        previa = -1;
        for (let x = rand() * px * 8; x < ancho; x += (px + 1) * (22 + rand() * 10)) {
            previa = elegir(rand, previa);
            plantar(FLORES_CHICAS[previa], px + 1, x, -px + rand() * px * 3, rand, true);
        }
    }

    sembrarPrado();

    let temporizador;
    window.addEventListener("resize", function () {
        clearTimeout(temporizador);
        temporizador = setTimeout(function () {
            // la barra del navegador en celular cambia solo el alto: no hace falta resembrar
            if (Math.abs(window.innerWidth - ultimoAncho) > 40) {
                sembrarPrado();
            }
        }, 200);
    });

    /* ==========================================================
       PÉTALOS CAYENDO
       ========================================================== */

    const contenedorPetalos = document.getElementById("petals");

    if (contenedorPetalos && !sinMovimiento) {
        const rand = mulberry32(77);
        const colores = ["#f7a8c9", "#ee76a5", "#ffc4dc"];
        const cantidad = window.innerWidth < 600 ? 10 : 18;

        for (let i = 0; i < cantidad; i++) {
            const petalo = document.createElement("div");
            petalo.className = "petal";
            petalo.style.setProperty("--x", (rand() * 100).toFixed(1) + "vw");
            petalo.style.setProperty("--dur", (9 + rand() * 9).toFixed(1) + "s");
            petalo.style.setProperty("--delay", (-rand() * 18).toFixed(1) + "s");
            petalo.style.setProperty("--sway", (2 + rand() * 2).toFixed(1) + "s");
            petalo.style.setProperty("--s", (7 + Math.floor(rand() * 3) * 3) + "px");
            petalo.style.setProperty("--c", colores[Math.floor(rand() * colores.length)]);
            petalo.appendChild(document.createElement("i"));
            contenedorPetalos.appendChild(petalo);
        }
    }

    /* ==========================================================
       ABEJITA Y SPRITES DE LA CARTA
       ========================================================== */

    const abeja = document.getElementById("bee");
    if (abeja) {
        abeja.appendChild(crearSprite("abeja", window.innerWidth < 600 ? 3 : 4));
    }

    // flores del título (reemplazan al emoji)
    document.querySelectorAll(".mc-sprite").forEach(function (el) {
        el.textContent = "";
        el.appendChild(crearSprite(el.dataset.sprite, Number(el.dataset.px) || 3));
    });

    // corazón de la portada (reemplaza al ♥)
    const corazon = document.getElementById("corazon");
    if (corazon) {
        corazon.textContent = "";
        corazon.appendChild(crearSprite("corazon", 9));
    }

    /* ==========================================================
       FLORES DE FONDO EN EL PAPEL DE LA CARTA
       (un mosaico de flores pixel, suavecito, que se mueve con el texto)
       ========================================================== */

    const LADO_PATRON = 176;

    function crearPatronPapel() {
        const px = 3;
        const escala = 2; // se dibuja al doble para que se vea nítido en pantallas retina
        const lienzo = document.createElement("canvas");
        lienzo.width = LADO_PATRON * escala;
        lienzo.height = LADO_PATRON * escala;
        const ctx = lienzo.getContext("2d");
        ctx.globalAlpha = 0.3;

        // [sprite, x, y] dentro del mosaico
        const colocar = [
            ["allium", 10, 8],
            ["aciano", 100, 14],
            ["petalos", 62, 46],
            ["amapola", 52, 92],
            ["diente", 128, 96],
            ["tulipan", 8, 122],
            ["petalos", 108, 150]
        ];

        colocar.forEach(function (item) {
            const filas = SPRITES[item[0]];
            filas.forEach(function (fila, fy) {
                for (let fx = 0; fx < fila.length; fx++) {
                    const color = PALETA[fila[fx]];
                    if (color) {
                        ctx.fillStyle = color;
                        ctx.fillRect(
                            (item[1] + fx * px) * escala,
                            (item[2] + fy * px) * escala,
                            px * escala,
                            px * escala
                        );
                    }
                }
            });
        });

        return lienzo.toDataURL();
    }

    /* ==========================================================
       ABRIR / CERRAR LA CARTA
       ========================================================== */

    const carta = document.getElementById("letter");
    const portada = document.getElementById("portada");
    const contenido = document.getElementById("contenido");
    const desplazable = document.getElementById("scroll");
    const titulo = document.getElementById("titulo-carta");
    const botonAbrir = document.getElementById("openLetter");
    const botonCerrar = document.getElementById("closeLetter");

    let animando = false;
    let abierta = false;

    contenido.style.setProperty("--patron", "url(" + crearPatronPapel() + ")");

    function alTerminar(elemento, ms, accion) {
        let hecho = false;
        function fin() {
            if (hecho) return;
            hecho = true;
            accion();
        }
        elemento.addEventListener("animationend", function (e) {
            if (e.target === elemento) fin();
        });
        setTimeout(fin, ms + 100); // por si el navegador no avisa
    }

    function lanzarCorazones() {
        if (sinMovimiento) return;
        for (let i = 0; i < 9; i++) {
            const img = crearSprite("corazon", 3 + Math.floor(Math.random() * 2));
            img.className = "corazon-vuela";
            img.style.setProperty("--dx", ((Math.random() - 0.5) * 260).toFixed(0) + "px");
            img.style.setProperty("--dy", (150 + Math.random() * 170).toFixed(0) + "px");
            img.style.animationDelay = i * 70 + "ms";
            carta.appendChild(img);
            setTimeout(function () { img.remove(); }, 2400);
        }
    }

    function abrirCarta() {
        if (animando || abierta) return;
        animando = true;

        contenido.hidden = false;
        desplazable.scrollTop = 0;

        function terminar() {
            portada.hidden = true;
            portada.classList.remove("abriendo");
            abierta = true;
            animando = false;
            titulo.focus({ preventScroll: true });
        }

        if (sinMovimiento) {
            terminar();
            return;
        }

        portada.classList.add("abriendo");
        lanzarCorazones();
        alTerminar(portada, 700, terminar);
    }

    function cerrarCarta() {
        if (animando || !abierta) return;
        animando = true;

        portada.hidden = false;

        function terminar() {
            portada.classList.remove("cerrando");
            contenido.hidden = true;
            abierta = false;
            animando = false;
            botonAbrir.focus({ preventScroll: true });
        }

        if (sinMovimiento) {
            terminar();
            return;
        }

        portada.classList.add("cerrando");
        alTerminar(portada, 600, terminar);
    }

    botonAbrir.addEventListener("click", abrirCarta);
    botonCerrar.addEventListener("click", cerrarCarta);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") cerrarCarta();
    });

});
