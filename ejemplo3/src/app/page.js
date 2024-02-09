"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [operacion, setOperacion] = useState('');
  const [showInputs, setShowInputs] = useState(false); 
  const [showVolver, setShowVolver] = useState(false); 

  const handleChangeOperacion = (operacionSeleccionada) => {
    setOperacion(operacionSeleccionada);
    setNumero1('');
    setNumero2('');
    setResultado(null);
    setError('');
    setShowInputs(true);
    setShowVolver(true); 
  };

  const realizarOperacion = () => {
    if (error) {
      return;
    }
  
    if (!numero1 || !numero2 || !operacion) {
      setError('Por favor, completa ambos campos y selecciona una operación');
      return; 
    }
  
    let resultadoOperacion;
    if (operacion === 'sumar') {
      resultadoOperacion = parseFloat(numero1) + parseFloat(numero2);
    } else if (operacion === 'restar') {
      resultadoOperacion = parseFloat(numero1) - parseFloat(numero2);
    } else if (operacion === 'multiplicar') {
      resultadoOperacion = parseFloat(numero1) * parseFloat(numero2);
    } else if (operacion === 'dividir') {
      resultadoOperacion = parseFloat(numero1) / parseFloat(numero2);
    } else if (operacion === 'exponenciar') {
      resultadoOperacion = parseFloat(numero1) ** parseFloat(numero1);
    }
  
    setResultado(`El resultado es: ${resultadoOperacion}`);
  };

  const limpiarCampos = () => {
    setNumero1('');
    setNumero2('');
    setResultado(null);
    setError('');
    setShowInputs(false); // Ocultar los campos de entrada al limpiar
    setShowVolver(false); // Ocultar el botón "Volver al Panel Principal" al limpiar
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Calculadora</h1>
      </header>
      <div className={styles.calculadora}>
        {!showInputs && (
          <div>
            <button className={styles.button} onClick={() => handleChangeOperacion('sumar')}>Sumar</button>
            <button className={styles.button} onClick={() => handleChangeOperacion('restar')}>Restar</button>
            <button className={styles.button} onClick={() => handleChangeOperacion('multiplicar')}>Multiplicar</button>
            <button className={styles.button} onClick={() => handleChangeOperacion('dividir')}>Dividir</button>
            <button className={styles.button} onClick={() => handleChangeOperacion('exponenciar')}>Exponenciar</button>
          </div>
        )}
        
        {showInputs && (
          <>
            <div className={styles.numeros}>
              <label className={styles.text}>Número 1:</label>
              <input className={styles.inputnum} type="number" value={numero1} onChange={(e) => setNumero1(e.target.value)} />
            </div>
            {operacion !== 'exponenciar' && (
              <div className={styles.numeros}>
                <label className={styles.text}>Número 2:</label>
                <input className={styles.inputnum} type="number" value={numero2} onChange={(e) => setNumero2(e.target.value)} />
              </div>
            )}
            <button className={styles.button} onClick={realizarOperacion}>Calcular</button>
          </>
        )}
        
        {showVolver && <button className={styles.button} onClick={() => limpiarCampos()}>Volver al Panel Principal</button>}
        <button className={styles.button} onClick={limpiarCampos}>Limpiar</button>
        
        {error && <div className={styles.error}>{error}</div>}
        {resultado && <div className={styles.resultado}>{resultado}</div>}
      </div>
    </main>
  );
}
