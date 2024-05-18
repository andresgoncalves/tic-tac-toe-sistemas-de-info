class Game {
  constructor() {
    const datos = JSON.parse(localStorage.getItem('datos'));

    console.log('El último ganador fue: ' + datos.ultimoGanador);

    this.tablero = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
    this.turno = 'x';
    this.casillasHtml = document.querySelectorAll('#tablero .casilla');
    this.casillasHtml.forEach((elemento, index) => {
      elemento.addEventListener('click', () => {
        console.log(index);
        this.marcarCasilla(index);
      });
    });
  }

  prepararTablero() {
    this.tablero = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
    this.casillasHtml.forEach((elemento) => {
      elemento.className = 'casilla';
    });
  }

  marcarCasilla(id) {
    if (this.tablero[id] === '.') {
      this.tablero[id] = this.turno;
      this.casillasHtml.forEach((elemento, index) => {
        if (index === id) {
          elemento.classList.add(
            this.turno === 'x' ? 'casilla-x' : 'casilla-o'
          );
        }
      });
    }
    const ganador = this.validarTablero();
    if (ganador === null) {
      this.cambiarTurno();
    } else {
      this.registrarGanador(ganador);
      this.prepararTablero();
    }
  }

  registrarGanador(ganador) {
    if (ganador === 'x') {
      document.querySelector('.ganador-x').classList.remove('oculto');
      document.querySelector('.ganador-o').classList.add('oculto');
      document.querySelector('.empate').classList.add('oculto');
    } else if (ganador === 'o') {
      document.querySelector('.ganador-x').classList.add('oculto');
      document.querySelector('.ganador-o').classList.remove('oculto');
      document.querySelector('.empate').classList.add('oculto');
    } else if (ganador === '.') {
      document.querySelector('.ganador-x').classList.add('oculto');
      document.querySelector('.ganador-o').classList.add('oculto');
      document.querySelector('.empate').classList.remove('oculto');
    }

    const datos = {
      ultimoGanador: ganador,
    };

    localStorage.setItem('datos', JSON.stringify(datos));
  }

  cambiarTurno() {
    if (this.turno === 'x') {
      this.turno = 'o';
    } else {
      this.turno = 'x';
    }
  }

  validarTablero() {
    for (let i = 0; i < 3; i++) {
      const columna = this.validarColumna(i);
      if (columna !== '.') return columna;
      const fila = this.validarFila(i);
      if (fila !== '.') return fila;
      const diagonalDerecha = this.validarDiagonalDerecha(i);
      if (diagonalDerecha !== '.') return diagonalDerecha;
      const diagonalIzquierda = this.validarDiagonalIzquierda(i);
      if (diagonalIzquierda !== '.') return diagonalIzquierda;
    }

    if (this.validarEmpate()) return '.';

    return null;
  }

  validarColumna(columna) {
    let contador = '.';
    for (let i = 0; i < 3; i++) {
      const valor = this.tablero[3 * i + columna];
      if (valor === '.') {
        return '.';
      }
      if (contador === '.') {
        contador = valor;
      } else if (contador !== valor) {
        return '.';
      }
    }
    return contador;
  }

  validarFila(fila) {
    let contador = '.';
    for (let i = 0; i < 3; i++) {
      const valor = this.tablero[3 * fila + i];
      if (valor === '.') {
        return '.';
      }
      if (contador === '.') {
        contador = valor;
      } else if (contador !== valor) {
        return '.';
      }
    }
    return contador;
  }

  validarDiagonalIzquierda() {
    let contador = '.';
    for (let i = 0; i < 3; i++) {
      const valor = this.tablero[3 * i + i];
      if (valor === '.') {
        return '.';
      }
      if (contador === '.') {
        contador = valor;
      } else if (contador !== valor) {
        return '.';
      }
    }
    return contador;
  }

  validarDiagonalDerecha() {
    let contador = '.';
    for (let i = 0; i < 3; i++) {
      const valor = this.tablero[8 - 3 * i - i];
      if (valor === '.') {
        return '.';
      }
      if (contador === '.') {
        contador = valor;
      } else if (contador !== valor) {
        return '.';
      }
    }
    return contador;
  }

  validarEmpate() {
    for (let i = 0; i < 9; i++) {
      if (this.tablero[i] === '.') {
        return false;
      }
    }
    return true;
  }
}

let game = new Game();
game.prepararTablero();
