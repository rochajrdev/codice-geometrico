// Variáveis do jogo
        let currentRoom = 0;
        let selectedOption = 0;
        let startTime = 0;
        let timerInterval;

        // Sistema de pontuação
        let totalScore = 0;
        let roomAttempts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
        let roomScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

        // Respostas corretas
        const answers = {
            1: { min: 83.5, max: 84.5 },           // Área do retângulo: 12 × 7 = 84
            2: 1,            // Triângulo 1 tem menor perímetro e menor área
            3: { min: 153, max: 155 },  // Área do círculo: π × 7² ≈ 153.86
            4: {
                area: { min: 129, max: 131 },    // Área total ≈ 130.24
                perimeter: { min: 50, max: 52 }  // Perímetro ≈ 51.12
            },
            5: { min: 44, max: 45 },  // Área total: retângulo (32) + semicírculo (π × 4² ÷ 2 ≈ 12.56) = 44.56
            6: { min: 5.8, max: 6.2 },    // Perímetro real: 3cm × 4 lados × 50 (escala) = 600cm = 6m
            7: { min: 88, max: 89 },  // Área total: retângulo (60) + dois semicírculos (28.26) ≈ 88.26
            8: { min: 143, max: 145 }  // Área total: quadrado (144)
        };

        // Calcular pontuação baseada no número de tentativas
        function calculateScore(attempts) {
            switch(attempts) {
                case 1: return 3; // Acertou de primeira
                case 2: return 2; // Segunda tentativa
                case 3: return 1; // Terceira tentativa
                default: return 0; // Mais de 3 tentativas
            }
        }

        // Inicializar o jogo
        function startGame() {
            currentRoom = 1;
            startTime = Date.now();
            totalScore = 0;
            roomAttempts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
            roomScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
            updateProgressBar();
            showRoom('room1');
            startTimer();
        }

        // Iniciar o timer
        function startTimer() {
            timerInterval = setInterval(updateTimer, 1000);
        }

        // Atualizar o timer
        function updateTimer() {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('timer').textContent = 
                `⏰ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Atualizar barra de progresso
        function updateProgressBar() {
            const progress = (currentRoom / 8) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            
            // Atualizar indicador de sala
            const indicator = document.getElementById('roomIndicator');
            if (currentRoom > 0 && currentRoom <= 8) {
                indicator.style.display = 'block';
                indicator.textContent = `📍 Sala ${currentRoom}/8`;
                indicator.className = `room-indicator room${currentRoom}`;
            } else {
                indicator.style.display = 'none';
            }
        }

        // Mostrar sala específica
        function showRoom(roomId) {
            // Esconder todas as salas
            const rooms = document.querySelectorAll('.room');
            rooms.forEach(room => {
                room.classList.remove('active');
            });
            
            // Mostrar sala atual
            document.getElementById(roomId).classList.add('active');
        }

        // Selecionar opção na Sala 2
        function selectOption(option) {
            selectedOption = option;
            
            // Remover seleção anterior
            const options = document.querySelectorAll('.option');
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Adicionar seleção atual
            options[option - 1].classList.add('selected');
        }

        // Função para mostrar a tela de vitória com as pontuações
        function showVictoryScreen() {
            showRoom('victory');
            // Atualizar pontuações de cada sala
            for (let i = 1; i <= 8; i++) {
                document.getElementById(`score${i}`).textContent = `${roomScores[i]} pts`;
            }
            // Atualizar pontuação total
            document.getElementById('totalScoreFinal').textContent = `${totalScore} de 24 pontos`;
        }

        // Verificar resposta
        function checkAnswer(room) {
            if (!room) return;
            // Incrementar tentativas para a sala atual
            roomAttempts[room]++;
            
            let isCorrect = false;
            let feedback = '';
            
            switch(room) {
                case 1:
                    const answer1 = parseFloat(document.getElementById('answer1').value);
                    if (isNaN(answer1) || document.getElementById('answer1').value.trim() === '') {
                        roomAttempts[room]--; // Não contar como tentativa
                        feedback = '⚠️ Por favor, digite uma resposta antes de continuar!';
                        break;
                    }
                    isCorrect = answer1 >= answers[1].min && answer1 <= answers[1].max;
                    break;
                    
                case 2:
                    if (selectedOption === 0) {
                        roomAttempts[room]--; // Não contar como tentativa
                        feedback = '⚠️ Por favor, selecione um triângulo antes de continuar!';
                        break;
                    }
                    isCorrect = selectedOption === answers[2];
                    break;
                    
                case 3:
                    const answer3 = parseFloat(document.getElementById('answer3').value);
                    if (isNaN(answer3) || document.getElementById('answer3').value.trim() === '') {
                        roomAttempts[room]--; // Não contar como tentativa
                        feedback = '⚠️ Por favor, digite uma resposta antes de continuar!';
                        break;
                    }
                    isCorrect = answer3 >= answers[3].min && answer3 <= answers[3].max;
                    break;
                    
                case 4:
                    const answer4a = parseFloat(document.getElementById('answer4a').value);
                    const answer4b = parseFloat(document.getElementById('answer4b').value);
                    
                    if (isNaN(answer4a) || document.getElementById('answer4a').value.trim() === '' ||
                        isNaN(answer4b) || document.getElementById('answer4b').value.trim() === '') {
                        roomAttempts[room]--; // Não contar como tentativa
                        feedback = '⚠️ Por favor, preencha ambas as respostas antes de continuar!';
                        break;
                    }
                    
                    const areaCorrect = answer4a >= answers[4].area.min && answer4a <= answers[4].area.max;
                    const perimeterCorrect = answer4b >= answers[4].perimeter.min && answer4b <= answers[4].perimeter.max;
                    
                    isCorrect = areaCorrect && perimeterCorrect;
                    break;

                case 5:
                    const answer5 = parseFloat(document.getElementById('answer5').value);
                    if (isNaN(answer5) || document.getElementById('answer5').value.trim() === '') {
                        roomAttempts[room]--; // Não contar como tentativa
                        feedback = '⚠️ Por favor, digite uma resposta antes de continuar!';
                        break;
                    }
                    isCorrect = answer5 >= answers[5].min && answer5 <= answers[5].max;
                    break;

                case 6:
                    const answer6 = parseFloat(document.getElementById('answer6').value);
                    if (isNaN(answer6) || document.getElementById('answer6').value.trim() === '') {
                        roomAttempts[room]--; // Não contar como tentativa
                        feedback = '⚠️ Por favor, digite uma resposta antes de continuar!';
                        break;
                    }
                    isCorrect = answer6 >= answers[6].min && answer6 <= answers[6].max;
                    break;

                case 7:
                    const answer7 = parseFloat(document.getElementById('answer7').value);
                    if (isNaN(answer7) || document.getElementById('answer7').value.trim() === '') {
                        roomAttempts[room]--; // Não contar como tentativa
                        feedback = '⚠️ Por favor, digite uma resposta antes de continuar!';
                        break;
                    }
                    isCorrect = answer7 >= answers[7].min && answer7 <= answers[7].max;
                    break;

                case 8:
                    const answer8 = parseFloat(document.getElementById('answer8').value);
                    if (isNaN(answer8) || document.getElementById('answer8').value.trim() === '') {
                        roomAttempts[room]--; // Não contar como tentativa
                        feedback = '⚠️ Por favor, digite uma resposta antes de continuar!';
                        break;
                    }
                    isCorrect = answer8 >= answers[8].min && answer8 <= answers[8].max;
                    break;
            }
            
            // Gerar feedback baseado no resultado e tentativas
            if (feedback === '') { // Se não há erro de validação
                if (isCorrect) {
                    const score = calculateScore(roomAttempts[room]);
                    roomScores[room] = score;
                    totalScore += score;
                    
                    const scoreText = score > 0 ? ` (+${score} pontos!)` : ' (+0 pontos)';
                    const attemptText = roomAttempts[room] === 1 ? 'de primeira' : `na ${roomAttempts[room]}ª tentativa`;
                    
                    switch(room) {
                        case 1:
                            feedback = `🎉 Correto ${attemptText}! A área do retângulo é 12 × 7 = 84 m².${scoreText} A porta se abre!`;
                            break;
                        case 2:
                            feedback = `🎉 Correto ${attemptText}! O Triângulo 1 tem perímetro 12 e menor área.${scoreText} O caminho se abre!`;
                            break;
                        case 3:
                            feedback = `� Correto ${attemptText}! A área do círculo é π × r² = 153,86 m².${scoreText} O círculo se ativa!`;
                            break;
                        case 4:
                            feedback = `🏆 INCRÍVEL ${attemptText}! A figura complexa foi resolvida!${scoreText}`;
                            break;
                        case 5:
                            feedback = `🌺 PERFEITO ${attemptText}! A área total do jardim é 44,56 m²!${scoreText} O portão se abre!`;
                            break;
                        case 6:
                            feedback = `🏛️ EXCELENTE ${attemptText}! O perímetro real é 6m!${scoreText} A gaveta se abre!`;
                            break;
                        case 7:
                            feedback = `💧 INCRÍVEL ${attemptText}! A área do lago é 78,84m²!${scoreText} O cofre se abre!`;
                            break;
                        case 8:
                            feedback = `🏆 MAGISTRAL ${attemptText}! Área total = 174m² (144m² do quadrado + 30m² do triângulo)${scoreText} O Códice foi revelado!`;
                            break;
                    }
                } else {
                    // Feedback de erro com dica baseada no número de tentativas
                    const attempts = roomAttempts[room];
                    let hint = '';
                    
                    if (attempts === 2) {
                        switch(room) {
                            case 1: hint = ' 💡 Dica: Área = base × altura '; break;
                            case 2: hint = ' 💡 Dica: Calcule P1=12, P2=18, P3=12. Entre P1 e P3, compare as áreas!'; break;
                            case 3: hint = ' 💡 Dica: Área = π × r² = 3,14 × 7²'; break;
                            case 4: hint = ' 💡 Dica: Área total = retângulo + círculo completo. Perímetro = lados retos + circunferência'; break;
                            case 6: hint = ' 💡 Dica: Lembre-se de converter as medidas da planta para a realidade usando a escala!'; break;
                        }
                    } else if (attempts >= 3) {
                        hint = attempts === 3 ? ' ⚠️ Última chance para ganhar pontos!' : ' 🔓 Resposta será liberada após mais uma tentativa incorreta.';
                        
                        if (attempts >= 4) {
                            // Liberar a sala sem pontos após 4+ tentativas
                            isCorrect = true;
                            feedback = `🔓 Sala liberada! Resposta correta: `;
                            switch(room) {
                                case 1: feedback += '84 m² (12 × 7)'; break;
                                case 2: feedback += 'Triângulo 1 (menor perímetro e área)'; break;
                                case 3: feedback += '153,86 m² (π × 7²)'; break;
                                case 4: feedback += 'Área: 130,24 m², Perímetro: 51,12 m'; break;
                            }
                            feedback += '. Continue para a próxima sala!';
                        }
                    }
                    
                    if (!isCorrect) {
                        feedback = `❌ Tentativa ${attempts}/∞ incorreta.${hint} Tente novamente!`;
                    }
                }
            }
            
            // Mostrar feedback
            const feedbackElement = document.getElementById(`feedback${room}`);
            feedbackElement.textContent = feedback;
            feedbackElement.className = `feedback ${isCorrect ? 'success' : 'error'}`;
            
            // Se correto, avançar para próxima sala ou finalizar o jogo
            if (isCorrect) {
                if (room === 8) {
                    // Mostrar feedback final
                    feedbackElement.textContent = feedback;
                    feedbackElement.className = 'feedback success';
                    
                    // Parar o timer
                    clearInterval(timerInterval);
                    
                    // Ir para a tela de desfecho depois de 2 segundos
                    setTimeout(() => {
                        showRoom('ending');
                    }, 2000);
                } else {
                    // Para as outras salas
                    setTimeout(() => {
                        currentRoom++;
                        updateProgressBar();
                        showRoom(`room${currentRoom}`);
                        feedbackElement.textContent = '';
                        feedbackElement.className = 'feedback';
                    }, 2000);
                }
            }
            }


        // Reiniciar o jogo
        function restartGame() {
            currentRoom = 0;
            selectedOption = 0;
            totalScore = 0;
            roomAttempts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
            roomScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
            clearInterval(timerInterval);
            
            // Limpar inputs
            document.querySelectorAll('input').forEach(input => input.value = '');
            
            // Limpar feedbacks
            document.querySelectorAll('.feedback').forEach(feedback => {
                feedback.textContent = '';
                feedback.className = 'feedback';
            });
            
            // Limpar seleções
            document.querySelectorAll('.option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Resetar barra de progresso e indicador
            document.getElementById('progressFill').style.width = '0%';
            document.getElementById('roomIndicator').style.display = 'none';
            
            // Voltar para introdução
            showRoom('intro');
        }

        // Detectar Enter nos inputs
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (currentRoom >= 1 && currentRoom <= 8) {
                    checkAnswer(currentRoom);
                }
            }
        });

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            // Garantir que apenas a tela de introdução está visível
            showRoom('intro');
        });