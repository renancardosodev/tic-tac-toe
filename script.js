function mostrarGanhador(ganhador){
    const popUpGanhador = document.createElement('section')
    const h2Ganhador = document.createElement('h2')
    const pGanhador = document.createElement('p')
    const btnNewGame = document.createElement('button')
    
    popUpGanhador.id = 'popUpGanhador'
    btnNewGame.classList.add('newGame')
    btnNewGame.innerText = 'Jogar de novo'

    if(ganhador != 'velha'){
        h2Ganhador.innerText = 'Parabéns'
        pGanhador.innerText = 'Voce ganhou ' + ganhador
    }else {
        h2Ganhador.innerText = 'Deu VELHA'
        pGanhador.innerText = 'Que pena! Não teve ganhador. Vamos tentar outra vez?'
    }

    setTimeout(() => {
        popUpGanhador.append(h2Ganhador, pGanhador, btnNewGame)
        document.querySelector('main').append(popUpGanhador)
    }, 1500);

    btnNewGame.addEventListener('click', ()=>{
        if(popUpGanhador){
            popUpGanhador.remove()
        }
        document.querySelectorAll('.spanCasa').forEach((e)=>{
            e.innerText = ''
            e.classList.remove('spanGanhador')  
        })
    })
}

function verficarSeGanhou(arr, a, b, c, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2){
    if(arr[a].innerText === escolhaPlayer1 && arr[b].innerText === escolhaPlayer1 && arr[c].innerText === escolhaPlayer1) {
        arr[a].classList.add('spanGanhador')
        arr[b].classList.add('spanGanhador')
        arr[c].classList.add('spanGanhador')
        const score1 = document.getElementById('score1')
        score1.innerText = Number(score1.innerText) + 1
        mostrarGanhador(namePlayer1)

    } else if(arr[a].innerText === escolhaPlayer2 && arr[b].innerText === escolhaPlayer2 && arr[c].innerText === escolhaPlayer2) {
        arr[a].classList.add('spanGanhador')
        arr[b].classList.add('spanGanhador')
        arr[c].classList.add('spanGanhador')
        mostrarGanhador(namePlayer2)
        const score2 = document.getElementById('score2')
        score2.innerText = Number(score2.innerText) + 1
    }
}

function iniciarJogo(currentPlayer, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2){
    const spanCasa = [...document.querySelectorAll('.spanCasa')]
    let clicks = 1

    spanCasa.forEach((e,i,arr)=>{ 
        e.addEventListener('click', ()=>{
            if(e.innerText == ''){
                if(clicks%2) {
                    e.innerText = escolhaPlayer1
                    currentPlayer.innerText = 'Sua vez ' + namePlayer2
                }else {
                    e.innerText = escolhaPlayer2
                    currentPlayer.innerText = 'Sua vez ' + namePlayer1
                }

                verficarSeGanhou(arr, 0, 1, 2, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
                verficarSeGanhou(arr, 3, 4, 5, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
                verficarSeGanhou(arr, 6, 7, 8, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
                verficarSeGanhou(arr, 0, 4, 8, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
                verficarSeGanhou(arr, 2, 4, 6, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
                verficarSeGanhou(arr, 0, 3, 6, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
                verficarSeGanhou(arr, 1, 4, 7, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
                verficarSeGanhou(arr, 2, 5, 8, escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
                clicks++
            }
            if(spanCasa.every(el => el.innerText !== '') && spanCasa.every(cl => !cl.classList.contains('spanGanhador'))) {
                spanCasa.forEach((j)=>{
                    j.classList.add('spanGanhador')
                })
                mostrarGanhador('velha')  
            }
        })        
    })

}

function criarJogo(escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2) {
    const currentPlayer = document.createElement('section')
    const sectionGame = document.createElement('section')
    const newGame = document.createElement('section')

    const tabuleiro = document.createElement('span')

    const spanScoreJogador2 = document.createElement('span')
    const pScoreJogador2 = document.createElement('p')
    const score2 = document.createElement('p')  
    const spanScoreJogador1 = document.createElement('span')
    const pScoreJogador1 = document.createElement('p')
    const score1 = document.createElement('p')
      
    sectionGame.id = 'sectionGame'
    spanScoreJogador1.id = 'spanScoreJogador1'
    spanScoreJogador2.id = 'spanScoreJogador2'
    tabuleiro.id = 'tabuleiro'
    pScoreJogador1.innerText = namePlayer1
    pScoreJogador2.innerText = namePlayer2
    pScoreJogador1.classList.add('pScoreJogadores')
    pScoreJogador2.classList.add('pScoreJogadores')
    score1.classList.add('score')
    score1.id = 'score1'
    score1.innerText = 0
    score2.classList.add('score')
    score2.id = 'score2'
    score2.innerText = 0
    currentPlayer.id = 'currentPlayer'
    currentPlayer.innerText = 'Sua vez ' + namePlayer1
    newGame.classList.add('newGame')
    newGame.innerText = 'Novo Jogo'

    for(let i=0; i<=8 ; i++){
        const spanCasa = document.createElement('span')
        spanCasa.id = 'spanCasa-'+(i+1)
        spanCasa.classList.add('spanCasa')
        tabuleiro.append(spanCasa)
    }

    spanScoreJogador1.append(pScoreJogador1, score1)
    spanScoreJogador2.append(pScoreJogador2,score2)
    sectionGame.append(spanScoreJogador1, tabuleiro, spanScoreJogador2)
    document.querySelector('main').append(currentPlayer, sectionGame, newGame)

    iniciarJogo(currentPlayer,escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
    
    newGame.addEventListener('click', ()=>location.reload())
}

function criarPlayers(){
    const namePlayer1 = document.getElementById('player1').value
    const namePlayer2 = document.getElementById('player2').value
    const typeGamePlayer1 = document.querySelectorAll('#divBtn1 .btnEscolha')
    const typeGamePlayer2 = document.querySelectorAll('#divBtn2 .btnEscolha')
    let escolhaPlayer1 = ''
    let escolhaPlayer2 = ''

    typeGamePlayer1.forEach((e)=>{
        if (!e.classList.contains('btnDisable')){
            escolhaPlayer1 = e.dataset.value
        }
    })
    typeGamePlayer2.forEach((e)=>{
        if (e.disabled != true){
            escolhaPlayer2 = e.dataset.value
        }
    })

    if(namePlayer1 != "" && namePlayer2 != "" && btnEscolhaApertado == true) {
        document.getElementById('escolherPlayers').remove()
        criarJogo(escolhaPlayer1, escolhaPlayer2, namePlayer1, namePlayer2)
    }else{
        if(document.getElementById('spanError')){
            document.getElementById('spanError').remove()
        }
        const spanError = document.createElement('span')
        spanError.id = 'spanError'
        spanError.innerText = '*Preencha todos os campos para começar o jogo!'
        document.getElementById('escolherPlayers').append(spanError)
    }

}

function desabilitarBotao(btn, btn2, btn3, btn4){
    btn.addEventListener('click', ()=>{
        btn.classList.remove('btnDisable')
        btn2.classList.add('btnDisable')
        btn3.disabled = true
        btn4.disabled = false
    })
}

const btnX1 = document.getElementById('primeiroX')
const btnO1 = document.getElementById('primeiroO')
const btnX2 = document.getElementById('segundoX')
const btnO2 = document.getElementById('segundoO')
let btnEscolhaApertado = false

desabilitarBotao(btnX1, btnO1, btnX2, btnO2)
desabilitarBotao(btnO1, btnX1,btnO2, btnX2)

document.querySelectorAll('#divBtn1 .btnEscolha')[0].addEventListener('click',() => btnEscolhaApertado = true)
document.querySelectorAll('#divBtn1 .btnEscolha')[1].addEventListener('click', () => btnEscolhaApertado = true)

document.getElementById('btnStart').addEventListener('click', criarPlayers)