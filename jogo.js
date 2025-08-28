/*
PLANEJAMENTO DE CÓDIGO

1. Declarar variáveis
2. Declarar funções
3. Efetuar o loop e comandos de teclas

EXTENSO:

Jogo de pong, a BOLA inicia se movendo para um lado qualquer, ela precisa COLIDIR com os PADDLES que ficam na esquerda e na direita do canvas,
e também precisa COLIDIR com todos os lados do canvas. O paddle esquerdo se mexe com as teclas, 
o outro se mexe sozinho (precisa de colisão com o topo e a base do canvas).

Caso a colisão aconteça com os paddles ou extremidades do eixo y, a bola precisa INVERTER seu sentido. Caso a colisão aconteça com o fundo esquerdo
ou fundo direito do canvas, PONTOS devem ser adicionados. ESQUERDO = JOGADOR; DIREITO = PC;

VARIAVEIS:

* BOLA:
Círculo desenhado com variaveis ctx.2d. Possui posição horizontal(x), posição vertical (y), raio(r), 
topo(t), base(b), lado esquerdo(lesq), lado direito(ldir) e velocidades (vx, vy).

* PADDLES(esq, dir):
Retângulos desenhados com variaveis ctx.2d. Possuem x, y, altura(a), largura(l), t, b, lesq, ldir e vx,vy

* PONTOS:
2 contadores (p1, p2)

* COLISAO(bool).

FUNÇÕES:

* APAGA 

* ATUALIZA(POSIÇÃO OBJETOS E DETECTA COLISÕES)

* DESENHA

* LOOP

* COLISÃO ENTRE BOLA E PADDLES CANVAS

* COLISÃO ENTRE BOLA E PADDLES
*/ 
$().ready(function () {
    var canvas = $("#quadro")[0];
    var ctx = canvas.getContext("2d");

    var colisao = false;
    // bola
    // b
    var bola = {
        "x": canvas.width/2,
        "y": canvas.height/2,
        "r": 20,
        "vx": 1,
        "vy": 1,
        "cor": "blue",
        "t": this.y - this.r,
        "b": this.y + this.r,
        "d": this.x + this.r,
        "e": this.x - this.r,
        atualiza: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto: function () {
            /*
            if (colisao) {
                obj2.x = Math.random() * (canvas.width - obj2.l);
                obj2.y = Math.random() * (canvas.height - obj2.a);

            }
            else {
                ctx.fillStyle = this.cor;
            }
            */
            ctx.fillStyle = this.cor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    //paddle esquerdo (player)
    var p1 = {
        "x": canvas.width/4,
        "y": canvas.height/3,
        "l": 70,
        "a": 100,
        "vy": 0,
        "cor": "pink",
        "t": this.y,
        "b": this.y + this.l,
        "d": this.x + this.a,
        "e": this.x,
        atualiza: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
        }
    }
    //paddle direito (PC)
    var p2 = {
        "x": canvas.width - canvas.width/4,
        "y": canvas.height/3,
        "l": 70,
        "a": 100,
        "vy": 0,
        "cor": "pink",
        "t": this.y,
        "b": this.y + this.l,
        "d": this.x + this.a,
        "e": this.x,
        atualiza: function () {
            this.x += this.vx;
            this.y += this.vy;
        },
        desenharObjeto: function () {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.l, this.a);
        }
    }

    function detectaColisao(p1, p2) {
        if (p1.b > p2.t && p1.d > p2.e && p2.b > p1.t && p2.d > p1.e) {
            colisao = true;
        }
        else {
            colisao = false;
        }
    }
    // talvez separar entre bola e paddle? adaptar para topo e base
    function detectaLimite(obj) {
        if (obj.y < 0) {
            obj.y = 0;
            obj.vy = obj.vy*-1;
        }
        if (obj.y + obj.a > canvas.height) {
            obj.y = canvas.height - obj.a;
            obj.vy = obj.vy*-1;
        }
    }

    // adaptar para topo e base
    //a funcao nao sabe dos valores do JSON, ALTERAR (talvez trocar para this? ou so fazer hardcode mesmo)
    function detectaLimiteBola(bola) {
        if (bola.e < 0) {
            bola.x = canvas.width/2;
            bola.y = canvas.height/2;
            bola.vx = 1;
            bola.vy = 1;
            //pontuar p2
        }
        if (bola.t < 0) {
            bola.y = 0;
            bola.vy = bola.vy*-1;
        }
        if (bola.d  > canvas.width) {
            bola.x = canvas.width/2;
            bola.y = canvas.height/2;
            bola.vx = -1;
            bola.vy = -1;
            //pontuar p1
        }
        if (bola.b > canvas.height) {
            obj.y = canvas.height - bola.b;
            obj.vy = obj.vy*-1;
        }
    }


    function apagarTela() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function desenharTela() {
        apagarTela();

        snake[0].atualiza();

        obj2.atualiza();
        detectaColisao(snake[0], obj2);

        detectaLimiteBola(bola);
        detectaLimite(p2);

        snake[0].desenharObjeto();
        obj2.desenharObjeto();

        requestAnimationFrame(desenharTela);
    }

    /*
    function criaItemSnake() {
        return {
            "vx": 0,
            "vy": 0,
            "x": 50,
            "y": 50,
            "l": 15,
            "a": 15,
            "cor": "blue",
            atualiza: function () {
                this.x += this.vx;
                this.y += this.vy;
            },
            desenharObjeto: function () {
                if (colisao) {
                    obj2.x = Math.random() * (canvas.width - obj2.l);
                    obj2.y = Math.random() * (canvas.height - obj2.a);

                }
                else {
                    ctx.fillStyle = this.cor;
                }
                ctx.fillRect(this.x, this.y, this.l, this.a);
            }
        };
    }
    */
    //snake.push(criaItemSnake());
    desenharTela();
    $(window).keydown(function (event) {
        if (event.which == 38) { //cima
            p1.vy = -2;
        }
        if (event.which == 40) { //baixo
            p1.vy = 2;
        }
    });
});