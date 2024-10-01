let isJumping = false;
let gravityInterval;
let horizontalMovementInterval;
let moveDirection = null;
let currentPhase = 1;

// Detecta quando uma tecla é pressionada
document.addEventListener('keydown', (event) => {
const mario = document.getElementById('mario');
const copa = document.getElementById('copa');
const princesa = document.getElementById('princesa');

// Função para verificar colisão
const isColliding = (rect1, rect2) => {
return !(
rect1.right < rect2.left ||
rect1.left > rect2.right ||
rect1.bottom < rect2.top ||
rect1.top > rect2.bottom
);
};

// Movimento lateral do Mario (direita/esquerda)
if (event.key === 'ArrowRight' && !isJumping) {
moveDirection = 'right';
mario.style.left = `${mario.offsetLeft + 20}px`;
mario.style.transform = 'scaleX(1)'; // Olha para a direita
} else if (event.key === 'ArrowLeft' && !isJumping) {
moveDirection = 'left';
mario.style.left = `${mario.offsetLeft - 20}px`;

mario.style.transform = 'scaleX(-1)'; // Olha para a esquerda
}

// Quando pressionar espaço para pular
if (event.key === ' ' && !isJumping) {
isJumping = true;
mario.style.bottom = '120px'; // Altura do pulo inicial

// Inicia o movimento horizontal se a seta estiver pressionada durante o pulo
if (moveDirection) {
aplicarMovimentoHorizontal();
}

// Volta a aplicar gravidade após o pulo
setTimeout(() => {
aplicarGravidade();
}, 500);
}

// Verifica colisões com copa e princesa
setTimeout(() => {
const marioRect = mario.getBoundingClientRect();
const copaRect = copa.getBoundingClientRect();
const princesaRect = princesa.getBoundingClientRect();

// Colisão com o copa
if (isColliding(marioRect, copaRect)) {
alert('Você atingiu o copa, voltando para o início!');
mario.style.left = '50px'; // Reinicia a fase
mario.style.bottom = '0'; // No chão
}

// Alcançou a princesa
if (isColliding(marioRect, princesaRect)) {
if (currentPhase === 1) {
alert('Você alcançou a princesa! Bem-vindo à Fase 2!');
iniciarFaseDois();
} else if (currentPhase === 2) {
mostrarTelaComemoracao(); // Mostra a tela de comemoração
}
}
}, 50);
});

// Aplica gravidade e faz o Mario cair no chão
function aplicarGravidade() {
const mario = document.getElementById('mario');

gravityInterval = setInterval(() => {
// Verifica se o Mario ainda está no ar
if (parseInt(mario.style.bottom) > 0) {
mario.style.bottom = `${parseInt(mario.style.bottom) - 5}px`; // Desce gradualmente
} else {
mario.style.bottom = '0px'; // Mario no chão
clearInterval(gravityInterval); // Para a gravidade
clearInterval(horizontalMovementInterval); // Para o movimento lateral
isJumping = false;
}
}, 50);
}

// Aplica movimento horizontal enquanto está no ar (movimento parabólico)

function aplicarMovimentoHorizontal() {
const mario = document.getElementById('mario');

horizontalMovementInterval = setInterval(() => {
if (moveDirection === 'right') {
mario.style.left = `${mario.offsetLeft + 20}px`; // Move para a direita
} else if (moveDirection === 'left') {
mario.style.left = `${mario.offsetLeft - 20}px`; // Move para a esquerda
}
}, 50);
}

// Função para iniciar a fase 2
function iniciarFaseDois() {
currentPhase = 2;

// Troca o cenário
const gameContainer = document.getElementById('game-container');
gameContainer.style.backgroundImage = "url('cenario2.jpg')"; // Troca o cenário

// Reposiciona elementos
const mario = document.getElementById('mario');
mario.style.left = '50px'; // Mario volta ao início
mario.style.bottom = '0'; // No chão

const copa = document.getElementById('copa');
copa.style.left = '500px'; // Reposiciona o copa

const princesa = document.getElementById('princesa');
princesa.style.left = '750px'; // Reposiciona a princesa
}

// Função para mostrar a tela de comemoração
function mostrarTelaComemoracao() {
const gameContainer = document.getElementById('game-container');
const comemoracao = document.getElementById('comemoracao');

gameContainer.style.display = 'none'; // Esconde o jogo
comemoracao.style.display = 'flex'; // Mostra a tela de comemoração
}

// Função para reiniciar o jogo
function reiniciarJogo() {
const gameContainer = document.getElementById('game-container');
const comemoracao = document.getElementById('comemoracao');
const mario = document.getElementById('mario');

gameContainer.style.display = 'block'; // Mostra o jogo novamente
comemoracao.style.display = 'none'; // Esconde a tela de comemoração
mario.style.left = '50px'; // Mario volta ao início
mario.style.bottom = '0px'; // No chão
currentPhase = 1; // Volta para a fase 1
gameContainer.style.backgroundImage = "url('cenario.jpg')"; // Troca o cenário para o da fase 1

// Reinicia posição dos outros elementos
const copa = document.getElementById('copa');
copa.style.left = '500px'; // Reposiciona o copa

const princesa = document.getElementById('princesa');
princesa.style.left = '750px'; // Reposiciona.
}