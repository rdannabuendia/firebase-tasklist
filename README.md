# Lista de Tareas PWA (React + Firebase)

## Requisitos
Se requiere:
- Node 18+
- Cuenta de Firebase (plan Spark)
  1. Entra a https://console.firebase.google.com con tu cuenta de Google.
  2. Crear un proyecto → nombre, por ejemplo firebase-tareaslist → puedes desactivar Google Analytics → Crear.
  3. Menú Compilación (Build) → Authentication → Comenzar → Sign-in method:
      + Activa Correo electrónico/contraseña.
      + Activa Google (elige un correo de soporte del proyecto) → Guardar.
  4. Menú Compilación → Firestore Database → Crear base de datos:
  5. Edición Standard, ubicación la más cercana (por ejemplo nam5 (us-central)).
  6. Elige modo producción (bloqueado por defecto; luego pondremos nuestras reglas).
  7. En Configuración del proyecto (el engrane) → General → Tus apps → icono </> (Web):
      + Ponle un apodo (tareas-web).
      + No marques todavía Hosting (lo haremos con la CLI).

## Configuración
Sigue los siguientes pasos
1. Clona el repo
2. Instala: `npm install`
3. Copia el archivo `.env.example` a `.env` y llena tus credenciales de Firebase (Estas se dan en el objeto firebaseConfig que te muestra en firebase)

## Correr en desarrollo
En la terminal PoweShell haz:
npm run dev

## Probar la PWA
En la terminal haz:
1. npm run build
2. npm run preview

## Desplegar
En la terminal:
1. firebase login 
2. firebase deploy
si no funciona utiliza 'npx' antes de cada comando

## Reglas de seguridad
Ver firestore.rules: cada usuario solo lee y modifica sus propias tareas.# firebase-tasklist
