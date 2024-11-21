// Referencias a los elementos del DOM
const entradaPHP = document.getElementById("phpInput");
const salidaJs = document.getElementById("salida_js");
const convertir = document.getElementById("convertir");
const copiar = document.getElementById("copiar");
const limpiar = document.getElementById("limpiar");

// Función para mostrar alertas
const mostrarAlerta = (mensaje) => alert(mensaje);

// Función que convierte el código PHP a JavaScript
const convertirPHPaJS = (phpCode) => {
  const reemplazos = [
    [/<\?php/g, "// Código convertido desde PHP"],
    [/\?>/g, "// Fin del código PHP"],
    [/\$([\w]+)/g, "$1"],
    [/echo\s+/g, "console.log("],
    [/;/g, ");"],
    [/if\s?\((.*?)\):/g, "if ($1) {"],
    [/array\((.*?)\)/g, "[$1]"],
    [/->/g, "."],
    [/class\s+([\w_]+)\s*{/g, "class $1 {"],
    [/public\s+function\s+([\w_]+)\((.*?)\)/g, "$1($2) {"],
    [/private\s+function\s+([\w_]+)\((.*?)\)/g, "#$1($2) {"],
    [/function\s+([\w_]+)\((.*?)\)/g, "$1($2) {"],
  ];
  return reemplazos.reduce(
    (codigo, [regex, reemplazo]) => codigo.replace(regex, reemplazo),
    phpCode.trim()
  );
};

// Manejo del botón convertir
convertir.addEventListener("click", () => {
  const phpCode = entradaPHP.value.trim();
  if (!phpCode) return mostrarAlerta("Por favor, ingresa código PHP para convertir.");
  if (!phpCode.includes("<?php") || !phpCode.includes("?>"))
    return mostrarAlerta("El contenido ingresado no es un código PHP válido. Asegúrate de incluir '<?php' y '?>'.");
  salidaJs.value = convertirPHPaJS(phpCode);
});

// Manejo del botón copiar
copiar.addEventListener("click", () => {
  const jsCode = salidaJs.value.trim();
  if (jsCode) {
    navigator.clipboard.writeText(jsCode);
    mostrarAlerta("¡Código copiado al portapapeles!");
  } else {
    mostrarAlerta("No hay código convertido para copiar.");
  }
});

// Manejo del botón limpiar
limpiar.addEventListener("click", () => {
  entradaPHP.value = salidaJs.value = "";
});
