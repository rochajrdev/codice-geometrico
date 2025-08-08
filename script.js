let attempts = {};
let score = 0;

const answers = {
    1: 108, // Área da sala 1
    2: 140, // Área da sala 2
    3: 117, // Área da sala 3
    4: 128, // Área da sala 4
    5: 56.52, // Área do jardim
    6: 78.5, // Área da planta baixa
    7: 78.84, // Área do lago (retângulo + dois semicírculos)
};

function showRoom(roomNumber) {
    // Oculta todas as salas
    document.querySelectorAll('.room').forEach(room => {
        room.style.display = 'none';
    });

    // Mostra a sala selecionada
    document.getElementById(`room${roomNumber}`).style.display = 'block';
}

function checkAnswer(roomNumber) {
    const userAnswer = parseFloat(document.getElementById(`answer${roomNumber}`).value);
    const correctAnswer = answers[roomNumber];
    
    if (!attempts[roomNumber]) {
        attempts[roomNumber] = 0;
    }
    attempts[roomNumber]++;

    const feedback = document.getElementById(`feedback${roomNumber}`);
    
    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        let pointsEarned = 4 - attempts[roomNumber];
        if (pointsEarned < 0) pointsEarned = 0;
        score += pointsEarned;
        
        feedback.innerHTML = `
            <p class="correct">🎉 Parabéns! Você acertou!</p>
            <p>Pontos ganhos nesta sala: ${pointsEarned}</p>
            <p>Pontuação total: ${score}</p>
            ${roomNumber < 8 ? `<button class="btn" onclick="showRoom(${roomNumber + 1})">➡️ Próxima Sala</button>` : ''}
        `;
        feedback.style.display = 'block';
    } else {
        let hint = '';
        if (roomNumber === 1) {
            hint = 'Dica: Calcule a área total do retângulo somando com a área do triângulo.';
        } else if (roomNumber === 2) {
            hint = 'Dica: Divida a figura em formas geométricas mais simples e some suas áreas.';
        } else if (roomNumber === 3) {
            hint = 'Dica: A área do trapézio pode ser calculada usando a fórmula: ((B + b) × h) ÷ 2';
        } else if (roomNumber === 4) {
            hint = 'Dica: Lembre-se que a área do círculo é πr², onde r é o raio.';
        } else if (roomNumber === 5) {
            hint = attempts[roomNumber] === 1 ? 'Dica: Divida a área em retângulo e semicírculo.' :
                   attempts[roomNumber] === 2 ? 'Dica: A área do semicírculo é (πr²)/2' :
                   'Dica: O retângulo tem 8m × 6m e o semicírculo tem raio de 3m.';
        } else if (roomNumber === 6) {
            hint = attempts[roomNumber] === 1 ? 'Dica: Primeiro, converta todas as medidas de cm para m.' :
                   attempts[roomNumber] === 2 ? 'Dica: Para converter de cm² para m², divida por 10000.' :
                   'Dica: A área em cm² é 785000 cm². Converta para m².';
        } else if (roomNumber === 7) {
            hint = attempts[roomNumber] === 1 ? 'Dica: A área total é a soma do retângulo central com dois semicírculos.' :
                   attempts[roomNumber] === 2 ? 'Dica: Área do retângulo = base × altura. Área de cada semicírculo = (πr²)/2' :
                   'Dica: Retângulo = 10m × 6m = 60m². Cada semicírculo tem raio = 3m.';
        }
        
        feedback.innerHTML = `
            <p class="incorrect">❌ Resposta incorreta. Tentativa ${attempts[roomNumber]} de 3.</p>
            <p>${hint}</p>
        `;
        feedback.style.display = 'block';

        if (attempts[roomNumber] >= 3) {
            feedback.innerHTML += `
                <p>Você atingiu o número máximo de tentativas. A resposta correta era ${correctAnswer}.</p>
                ${roomNumber < 8 ? `<button class="btn" onclick="showRoom(${roomNumber + 1})">➡️ Próxima Sala</button>` : ''}
            `;
        }
    }
}

// Mostra a primeira sala quando a página carrega
window.onload = function() {
    showRoom(1);
};
