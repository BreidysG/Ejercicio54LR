let speed = 300; // Velocidad predeterminada en milisegundos
let timer = 180; // 3 minutos en segundos
let timerInterval;
let currentIndex = 0;
let lines = [
    "El día se despide lentamente entre colores apagados.",
    "Una ligera neblina cubre los valles, envolviendo todo en misterio.",
    "Las primeras gotas de lluvia caen, trayendo consigo el aroma de la tierra húmeda.",
    "El aire fresco susurra entre las ramas, dando vida a la naturaleza dormida.",
    "La luz del crepúsculo se desvanece, dejando lugar a la penumbra de la noche.",
    "Los pájaros se ocultan en silencio, preparándose para el descanso.",
    "El viento sopla suavemente, moviendo las hojas con un murmullo casi imperceptible.",
    "La luna aparece lentamente, iluminando el horizonte con su brillo plateado.",
    "Todo a su alrededor parece entrar en un estado de quietud y serenidad.",
    "El momento invita a la reflexión, mientras la naturaleza se entrega al descanso.",
    "Las estrellas comienzan a parpadear tímidamente en el cielo, anunciando la llegada de la noche.",
    "A lo lejos, el suave murmullo del mar acompaña la tranquilidad del anochecer.",
    "El silencio se apodera del ambiente, mientras la noche toma el control.",
    "Los grillos comienzan su canto, llenando de música la oscuridad.",
    "El bosque se transforma en un escenario de sombras y sonidos.",
    "La brisa acaricia las copas de los árboles, susurrando secretos.",
    "Una suave melodía natural acompaña el reposo de la tierra.",
    "Las luciérnagas aparecen, como pequeñas estrellas en el suelo.",
    "El cielo oscuro se viste con una capa de estrellas titilantes.",
    "Las olas del mar continúan su danza en un vaivén sin fin.",
    "Un reflejo plateado adorna la superficie de las aguas.",
    "Los animales nocturnos se mueven con cautela entre las sombras.",
    "La frescura de la noche envuelve cada rincón del paisaje.",
    "Las nubes se disipan lentamente, dejando ver un cielo despejado.",
    "El murmullo de un arroyo cercano se mezcla con la calma.",
    
];


// Inicia el ejercicio cuando el usuario hace clic en el botón "Iniciar"
document.getElementById('startBtn').addEventListener('click', startExercise);

function startExercise() {
    const userSpeed = document.getElementById('speed').value;
    speed = parseInt(userSpeed) || 300; // Asigna la velocidad del usuario o 300ms si no es válida

    document.getElementById("exerciseArea").classList.remove("hidden");
    document.getElementById("p1").classList.add("hidden");
    document.getElementById("div1").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");

    startTimer(); // Inicia el temporizador
    showNextLines(); // Muestra las líneas de texto con el subrayado
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Tiempo restante: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("¡Tiempo terminado!");
        }
    }, 1000);
}

function showNextLines() {
    const textArea = document.getElementById('textArea');
    const puntosImage = document.getElementById('puntos');
    const puntosImage2 = document.getElementById("puntos2"); // Imagen central
    textArea.innerHTML = ''; // Limpia el área de texto antes de mostrar nuevas líneas

    if (currentIndex < lines.length) {
        // Crear las dos primeras líneas, imagen central y dos líneas siguientes
        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        const line3 = document.createElement('div');
        const line4 = document.createElement('div');
        const line5 = document.createElement('div');

        // Asigna clases y contenido de texto a las líneas
        line1.classList.add('line', 'active');
        line2.classList.add('line', 'active');
        line3.classList.add('line', 'active');
        line4.classList.add('line', 'active');
        line5.classList.add('line', 'active');
        line1.innerText = lines[currentIndex];
        line2.innerText = lines[currentIndex + 1] || "";
        line3.innerText = lines[currentIndex + 2] || "";
        line4.innerText = lines[currentIndex + 3] || "";
        line5.innerText = lines[currentIndex + 4] || "";

        // Añade las dos primeras líneas, luego la imagen, y después las dos líneas siguientes al área de texto
        textArea.appendChild(line1);
        textArea.appendChild(line2);
        textArea.appendChild(puntosImage);  // Coloca la imagen entre las dos primeras y las dos últimas líneas
        textArea.appendChild(line3);
        textArea.appendChild(line4);
        textArea.appendChild(puntosImage2);
        textArea.appendChild(line5);

        // Resalta cada línea en secuencia
        highlightLine(line1, () => {
            highlightLine(line2, () => {
                highlightLine(line3, () => {
                    highlightLine(line4, () => {
                        highlightLine(line5, () => {
                        currentIndex += 5;

                        // Reinicia el índice si llegamos al final
                        if (currentIndex >= lines.length) {
                            currentIndex = 0;
                        }

                        setTimeout(showNextLines, speed);
                    });
                });
            });
        });
    }); 
    }
}

function highlightLine(line, callback) {
    line.classList.add('highlight'); // Añade fondo de subrayado
    setTimeout(() => {
        line.classList.remove('highlight'); // Quita el fondo después de la duración
        callback(); // Llama a la siguiente acción
    }, speed);
}
