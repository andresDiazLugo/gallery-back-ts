1-inicializamos el proyecto con npm init -y

2- instalamos la dependencia typescript como dependencia de desarrollo
- npm install typescript -D

3- en los script de package json creamos el  script tsc
-"script":{
    "tsc":"tsc",
}
-este tsc al final lo que hace es transformar los ficheros de typescript a javascript

4-inicalizamos nuestro proyecto con typescript
- npm run tsc -- --init

5- una vez generado el archivo tsconfig.json vamos a descomentar algunas lineas que sirven para configurar nuestro proyecto en typescript
- "module": esto sirve para elegir como quieres exportar e importar los archivos por defecto vien en commojs
-"outDir":esto seria el lugar donde va a dejar los archivos compilados de typescrip
- "strict": son chequeso strictos en nuestro codigo, popr defecto viene true.
- "noUnusedLocals": true , esto te dice si tienes una variable local sin ultilizar
- "noImplicitReturns":true, esto te dice que siempre nuestras funciones tienen que tener un return, por ejemplo si tienes un undefined tienes que poner un return, undefined es lo que devuelve una funcion por defecto
- "noFallthroughCasesInSwitch": true, este es para los switch esto te obliga poner un return
- "esModuleInterop": true, esto es para que funcione tanto emascript module como commonjs.

6-instalamos la dependencia de express -E, con esto vamos a guardar la version Exacta 
- npm install express -E

7-creamos uuna caroeta sourc (src), por que aqui vamos alojar el codigo fuente y luego el codigo compilado lo puedes tener en otras carpetas

8-cuando usas typescript te pueden suceder dos cosa una que tu paquete que si tenga los typos que ya vienen instalados y la segunda que algunos paquetes no vengan instalados y los tengas que instalar

9- instalamos una dependecia que nos permite escuchar los cambios que vamos haciendo en codigo fuente 
- npm install ts-node-dev -D

10- Agregamos en el archivo tsconfig.json el archivo "resolveJsonModule" en true para pueda leer estos tipos de archivos al importarlos

11-instalar ts-satandard es un linter muy bueno
-crear un script con el valor ts-standar
- colocar   "eslintConfig": {
    "parserOptions": {
      "project": "./tsconfig.json"
    },
    "extends":["./node_modules/ts-standard/eslintrc.json"]
  }